const mysql = require("../../config/mysql");

class UserStorage {
    static async emailConfirm(email) {
        try {
            const query = `SELECT * FROM users where users.email = ?`;
            const emailCheck = await mysql.query(query, [email]);

            return emailCheck[0];
        } catch(err) {
            throw { msg: `${err} : email 확인 에러 입니다.` };
        }
    }

    static async nicknameConfirm(nickname) {
        try {
            const query = `SELECT * FROM users where users.nickname = ?`;
            const nicknameCheck = await mysql.query(query, [nickname]);

            return nicknameCheck[0];
        } catch(err) {
            throw { msg: `${err} : nickname 확인 에러 입니다.` };
        }
    }

    static async signUp(profile, salt) {
        try {
            const {name, email, phone, nickname, manager, school_no, major_no} = profile;
            const query = `INSERT INTO users(name, email, phone, nickname, manager, salt, school_no, major_no) 
            VALUES(?,?,?,?,?,?,?,?)`;

            const insertResult = await mysql.query(query,[
                name, 
                email, 
                phone, 
                nickname, 
                manager, 
                salt,
                school_no, 
                major_no
            ]);

            return insertResult[0].affectedRows;
        } catch(err) {
            throw { msg: `${err} : 회원가입 에러 입니다.` }
        }
    }
}

module.exports = UserStorage;