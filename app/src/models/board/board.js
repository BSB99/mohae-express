const BoardStorage = require("./boardStorage");
const {category} = require('../category/category');
const { area } = require("../area/area");

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

  async createBoard() {
    try {
      const boardInfo = this.body;
    
      const categoryConfirm = await category.confirm(boardInfo.category_no);
      if (categoryConfirm !== undefined) {
        return categoryConfirm;
      }

      const areaConfirm = await area.confirm(boardInfo.area_no);
      if (areaConfirm !== undefined) {
        return areaConfirm;
      }

      const createdBoard = await BoardStorage.createBoard(boardInfo);
      if (createdBoard) {
        return { success: true, msg: "게시글 생성이 완료되었습니다." };
      } else {
        return { success: false, msg: "게시글 생성이 실패하였습니다." };
      }
    } catch (err) {
      throw { err };
    }
  }
}
  
module.exports = Board;
