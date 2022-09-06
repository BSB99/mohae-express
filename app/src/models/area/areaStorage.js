const mysql = require("../../config/mysql");

class AreaStorage {
    static async areaConfirm(areaNo) {
        try{
            const query = 'SELECT * FROM areas where areas.no = ?'
            const areaInfo = await mysql.query(query, [areaNo])

            return areaInfo[0]
        } catch(err) {
            throw { msg: `${err} : 지역 체크 에러 입니다` };
        }
    } 
}

module.exports = AreaStorage