const mysql = require("../../config/mysql");

class CategoryStorage {
    static async categoryConfirm(categoryNo) {
        try{
            const query = 'SELECT * FROM categories where categories.no = ?'
            const categoryInfo = await mysql.query(query, [categoryNo])

            return categoryInfo[0]
        } catch(err) {
            throw { msg: `${err} : 카테고리 체크 에러 입니다` };
        }
    } 
}

module.exports = CategoryStorage