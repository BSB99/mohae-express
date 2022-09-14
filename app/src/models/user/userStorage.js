const mysql = require("../../config/mysql");

class UserStorage {
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
            throw {msg: `${err} : 회원가입 에러 입니다.`}
        }
    }
}

module.exports = UserStorage;