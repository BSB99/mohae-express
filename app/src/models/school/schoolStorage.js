const mysql = require("../../config/mysql");

class SchoolStorage {
    static async schoolConfirm(schoolNo) {
        try{
            const query = 'SELECT * FROM schools where schools.no = ?';
            const schoolInfo = await mysql.query(query, [schoolNo]);

            return schoolInfo[0];
        } catch(err) {
            throw { msg: `${err} : 학교 체크 에러 입니다` };
        }
    } 
}

module.exports = SchoolStorage;