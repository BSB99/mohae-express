const BoardStorage = require("./boardStorage");

class Board {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async readAllBoards() {
    const boards = await BoardStorage.readAllBoards();
    return boards;
  }

  async readByOneBoard() {
    try {
      const boardNo = this.params.no;
      const board = await BoardStorage.readByOneBoard(boardNo);

      if (board.length) {
        return {
          success: true,
          board,
        };
      } else {
        return {
          success: false,
          msg: `${boardNo}번 게시글은 없는 게시글 입니다.`,
        };
      }
    } catch (err) {
      throw { err };
    }
  }
}

module.exports = Board;
