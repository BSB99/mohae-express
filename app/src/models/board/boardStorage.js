const mysql = require("../../config/mysql");

class BoardStorage {
  static async readAllBoards() {
    try {
      const query = "SELECT * FROM boards";
      return await mysql.query(query);
    } catch (err) {
      throw { msg: `${err} : 게시글 전체조회 에러 입니다` };
    }
  }

  static async readByOneBoard(boardNo) {
    try {
      const query = `
      select boards.no, boards.title, boards.description, boards.isDeadline, boards.hit, boards.price, boards.summary, boards.target, boards.deadline, boards.created_at, categories.no as categoryNo, categories.name as category,areas.no as areaNo, areas.name as area from boards 
      left join categories on boards.category_no = categories.no 
      left join areas on boards.area_no = areas.no where boards.no = ?`;
      const result = await mysql.query(query, [boardNo]);
      return result[0];
    } catch (err) {
      throw { msg: `${err} : 게시글 상세조회 에러 입니다` };
    }
  }
}

module.exports = BoardStorage;
