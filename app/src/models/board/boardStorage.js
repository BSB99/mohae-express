const mysql = require("../../config/mysql");

class BoardStorage {
  static async readAllBoards() {
    try {
      const query = "SELECT * FROM boards where boards.deleted_at IS null";
      return await mysql.query(query);
    } catch (err) {
      throw { msg: `${err} : 게시글 전체조회 에러 입니다` };
    }
  }

  static async boardHit(boardNo) {
    try {
      const query = "UPDATE boards SET hit = hit + 1 WHERE boards.no = ?";
      const updatedBoardHit = await mysql.query(query, [boardNo]);

      return updatedBoardHit[0].affectedRows;
    } catch (err) {
      throw { msg: `${err} : 조회수 증가로직 에러 입니다.` };
    }
  }

  static async readByOneBoard(boardNo) {
    try {
      const query = `
      select boards.no, boards.title, boards.description, boards.isDeadline, boards.hit, boards.price, boards.summary, boards.target, boards.deadline, boards.created_at, categories.no as categoryNo, categories.name as category,areas.no as areaNo, areas.name as area from boards 
      left join categories on boards.category_no = categories.no 
      left join areas on boards.area_no = areas.no where boards.no = ? AND boards.deleted_at IS null`;
      const result = await mysql.query(query, [boardNo]);
      return result[0];
    } catch (err) {
      throw { msg: `${err} : 게시글 상세조회 에러 입니다` };
    }
  }

  static async createBoard(boardInfo, deadline) {
    try {
      const {
        title,
        description,
        price,
        summary,
        target,
        user_no,
        category_no,
        area_no,
      } = boardInfo;
      const query = `INSERT INTO boards(title, description, price, summary, target, deadline, user_no, category_no, area_no) VALUES(?,?,?,?,?,?,?,?,?)`;
      const insertResult = await mysql.query(query, [
        title,
        description,
        price,
        summary,
        target,
        deadline,
        user_no,
        category_no,
        area_no,
      ]);

      return insertResult[0].affectedRows;
    } catch (err) {
      throw { msg: `${err} : 게시글 생성 에러 입니다` };
    }
  }

  static async updateBoard(boardNo, boardInfo) {
    try {
      const {
        title,
        description,
        price,
        summary,
        target,
        deadline,
        category_no,
        area_no,
      } = boardInfo;
      const query = `UPDATE boards SET title = ?, description = ?, price = ?, summary = ?, target = ?, deadline = ?, category_no = ?, area_no = ?
      where boards.no = ?;`;
      const updateResult = await mysql.query(query, [
        title,
        description,
        price,
        summary,
        target,
        deadline,
        category_no,
        area_no,
        boardNo,
      ]);

      return updateResult[0].affectedRows;
    } catch (err) {
      throw { msg: `${err} : 게시글 수정 에러 입니다` };
    }
  }

  static async deleteBoard(boardNo) {
    try {
      const query = `UPDATE boards SET deleted_at=NOW() WHERE no = ?;`;
      const deleteResult = await mysql.query(query, [boardNo]);

      return deleteResult[0].affectedRows;
    } catch (err) {
      throw { msg: `${err} : 게시글 삭제 에러 입니다` };
    }
  }
}

module.exports = BoardStorage;
