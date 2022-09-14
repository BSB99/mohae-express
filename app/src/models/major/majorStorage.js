const mysql = require("../../config/mysql");

class MajorStorage {
    static async majorConfirm(majorNo) {
        try{
            const query = 'SELECT * FROM majors where majors.no = ?';
            const majorInfo = await mysql.query(query, [majorNo]);

            return majorInfo[0];
        } catch(err) {
            throw { msg: `${err} : 관심사 체크 에러 입니다` };
        }
    } 
}

module.exports = MajorStorage;