const UserStorage = require('./userStorage');
const { major } = require('../major/major');
const { school } = require('../school/school');
const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = Number(process.env.IV_LENGTH);

class User {
    constructor(req) {
        this.params = req.params;
        this.body = req.body;
    };

    async emailFaileConfirm(email) {
        try {
            const confirm = await UserStorage.emailConfirm(email);
            if(confirm.length) {
                return { success: false, msg: `${email}은 존재하는 email 입니다.` };
            };

            return { success: true, data: confirm.password };
        } catch(err) {
            throw { err };
        };
    };

    async emailSuccessConfirm(email) {
        try {
            const confirm = await UserStorage.emailConfirm(email);

            if(confirm.length) {
                return { success: true, salt: confirm[0].salt, no: confirm[0].no };
            };

            return { success: false, msg: `${email}은 존재하지 않는 email 입니다.` };
        } catch(err) {
            throw { err };
        };
    };

    async nicknameConfirm(nickname) {
        try {
            const confirm = await UserStorage.nicknameConfirm(nickname);
            if(confirm.length) {
                return { success: false, msg: `${nickname}은 존재하는 nickname 입니다.` };
            };

            return { success: true };
        } catch(err) {
            throw { err };
        };
    };

    async signUp() {
        try{
            const profile = this.body;
            
            const emailFaileConfirm = await this.emailFaileConfirm(profile.email);
            if(!emailFaileConfirm.success) {
                return emailFaileConfirm;
            }

            const nicknameConfirm = await this.nicknameConfirm(profile.nickname);
            if(!nicknameConfirm.success) {
                return nicknameConfirm;
            }

            const schoolConfirm = await school.confirm(profile.school_no);
            if(!schoolConfirm.success) {
                return schoolConfirm;
            }
            
            const majorConfirm = await major.confirm(profile.major_no);
            if(!majorConfirm.success) {
                return majorConfirm;
            }

            const salt = await this.encrypt(profile.password);

            const affectedRows = await UserStorage.signUp(profile, salt);
            if (affectedRows) {
                return { success: true, msg: '회원가입이 성공적으로 이루어 졌습니다.' };                
            };

            return { success: false, msg: '회원가입이 실패하였습니다.' };
        } catch(err) {
            throw { err };
        };
    };

    async encrypt(password) {
        try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(
          'aes-256-cbc',
          Buffer.from(ENCRYPTION_KEY),
          iv,
        );
        const encrypted = cipher.update(password);
      
        return (
          iv.toString('hex') +
          ':' +
          Buffer.concat([encrypted, cipher.final()]).toString('hex')
        );
      } catch(err) {
        throw err;
      };
    }

      async decrypt(salt) {
        try {
        const textParts = salt.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(
          'aes-256-cbc',
          Buffer.from(ENCRYPTION_KEY),
          iv,
        );
        const decrypted = decipher.update(encryptedText);
      
        return Buffer.concat([decrypted, decipher.final()]).toString();
        } catch (err) {
            throw err;
        }
    }

    async signIn() {
        try {
            const userInfo = this.body;

            const emailSuccessConfirm = await this.emailSuccessConfirm(userInfo.email);
            if(!emailSuccessConfirm.success) {
                return emailSuccessConfirm;
            }

            const decrypt = await this.decrypt(emailSuccessConfirm.salt);
        
            if (decrypt == userInfo.password) {
                return { success: true, msg: '로그인 성공' };                
            };

            return { success: false, msg: '비밀번호가 다릅니다.' };
        } catch(err) {
            throw { err };
        };
    };

    async secession() {
        try{
            const userInfo = this.body;

            const emailSuccessConfirm = await this.emailSuccessConfirm(userInfo.email);
            if(!emailSuccessConfirm.success) {
                return emailSuccessConfirm;
            }
            
            const decrypt = await this.decrypt(emailSuccessConfirm.salt);

            if (decrypt == userInfo.password) {
                const affectedRows = await UserStorage.secession(emailSuccessConfirm.no);
                
                if (affectedRows) {
                    return { success: true, msg: '회원 탈퇴가 성공적으로 이루어 졌습니다.'};
                }; 

                return { success: false, msg: '회원 탈퇴 실패!'};
            };

            return { success: false, msg: '비밀번호가 다릅니다.' };
        }catch(err) {
            throw { err };
        }
    }
}

module.exports = User;