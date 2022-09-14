const UserStorage = require('./userStorage');
const { major } = require('../major/major');
const { school } = require('../school/school');
const crypto = require('crypto');

class User {
    constructor(req) {
        this.params = req.params;
        this.body = req.body;
    }

    async emailConfrim(email) {
        try {
            const confirm = await UserStorage.emailConfirm(email);
            if(confirm.length) {
                return { success: false, msg: `${email}은 존재하는 email 입니다.` };
            }

            return { success: true };
        } catch(err) {
            throw { err };
        }
    }

    async nicknameConfirm(nickname) {
        try {
            const confirm = await UserStorage.nicknameConfirm(nickname);
            if(confirm.length) {
                return { success: false, msg: `${nickname}은 존재하는 nickname 입니다.` };
            };

            return { success: true };
        } catch(err) {
            throw { err };
        }
    }

    async signUp() {
        try{
            const profile = this.body;
            
            const emailConfrim = await this.emailConfrim(profile.email);
            if(!emailConfrim.success) {
                return emailConfrim;
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

            const password = crypto.randomBytes(32).toString('hex');
            const salt = crypto.pbkdf2Sync(profile.password, password, 1, 32, 'sha512').toString('hex');

            const affectedRows = await UserStorage.signUp(profile, salt);
            if (affectedRows) {
                return { success: true, msg: '회원가입이 성공적으로 이루어 졌습니다.' };                
            };

            return { success: false, msg: '회원가입이 실패하였습니다.' };
        } catch(err) {
            throw { err };
        };
    }
}

module.exports = User;