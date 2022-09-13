const mysql = require("../../config/mysql");

class CategoryStorage {
    static async categoryConfirm(categoryNo) {
        try{
            const query = 'SELECT * FROM categories where categories.no = ?';
            const categoryInfo = await mysql.query(query, [categoryNo]);
            
            return categoryInfo[0];
        } catch(err) {
            throw { msg: `${err} : 카테고리 체크 에러 입니다.` };
        }
    }
    
    static async readCategory(categoryNo) {
        try {
            const query = `SELECT boards.no, boards.title, boards.isDeadline, boards.price, boards.summary, boards.target, boards.category_no, categories.name as category, boards.area_no, areas.name AS area FROM boards 
            LEFT JOIN categories ON boards.category_no = categories.no
            LEFT JOIN areas ON boards.area_no = areas.no
            WHERE boards.category_no = ? AND boards.deleted_at IS null;`;
            const categoryInfo = await mysql.query(query, [categoryNo]);

            return categoryInfo[0];
        } catch(err) {
            throw { msg: `${err} : 카테고리 선택 조회 에러 입니다.` };
        }
    }
}

module.exports = CategoryStorage;