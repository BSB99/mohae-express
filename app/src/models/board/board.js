const BoardStorage = require("./boardStorage");
const { category } = require("../category/category");
const { area } = require("../area/area");

class Board {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async deadline(closeNo) {
    try {
      let deadline = new Date();

      if (closeNo) {
        deadline.setDate(deadline.getDate() + closeNo);
      } else {
        deadline = null;
      }

      return deadline;
    }catch (err) {
      throw {err}
    }
  }

  async addBoardHit(boardNo) {
    const boardHit = await BoardStorage.boardHit(boardNo);

    if (boardHit) {
      return {
        success: true,
        msg: `${boardNo}번 게시글 조회수가 증가하였습니다.`,
      };
    } else {
      return {
        success: false,
        msg: `${boardNo}번 게시글 조회수가 증가하지 않았습니다.`,
      };
    }
  }

  async readAllBoards() {
    const boards = await BoardStorage.readAllBoards();

    return boards;
  }

  async readByOneBoard() {
    try {
      const boardNo = this.params.no;
      const board = await BoardStorage.readByOneBoard(boardNo);

      if (!board.length) {
        return {
          success: false,
          msg: `${boardNo}번 게시글은 없는 게시글 입니다.`,
        };
      }

      await this.addBoardHit(boardNo);

      return {
        success: true,
        board,
      };
    } catch (err) {
      throw { err };
    }
  }

  async createBoard() {
    try {
      const boardInfo = this.body;

      const categoryConfirm = await category.confirm(boardInfo.category_no);
      if (!categoryConfirm.success) {
        return categoryConfirm;
      }

      const areaConfirm = await area.confirm(boardInfo.area_no);
      if (!areaConfirm.success) {
        return areaConfirm;
      }

      const deadline = await this.deadline(boardInfo.deadline);

      const createdBoard = await BoardStorage.createBoard(boardInfo, deadline);
      if (createdBoard) {
        return { success: true, msg: "게시글 생성이 완료되었습니다." };
      } else {
        return { success: false, msg: "게시글 생성이 실패하였습니다." };
      }
    } catch (err) {
      throw { err };
    }
  }

  async updateBoard() {
    try {
      const boardNo = this.params.no;
      const boardInfo = this.body;

      const boardConfirm = await BoardStorage.readByOneBoard(boardNo);
      if (!boardConfirm.length) {
        return {
          success: false,
          msg: `${boardNo}번 게시글은 없는 게시글 입니다.`,
        };
      }

      const categoryConfirm = await category.confirm(boardInfo.category_no);
      if (!categoryConfirm.success) {
        return categoryConfirm;
      }

      const areaConfirm = await area.confirm(boardInfo.area_no);
      if (!areaConfirm.success) {
        return areaConfirm;
      }

      const deadline = await this.deadline(boardInfo.deadline);

      const updatedBoard = await BoardStorage.updateBoard(boardNo, boardInfo, deadline);
      if (updatedBoard) {
        return { success: true, msg: "게시글 수정이 완료되었습니다." };
      } else {
        return { success: false, msg: "게시글 수정이 실패하였습니다." };
      }
    } catch (err) {
      throw { err };
    }
  }

  async deleteBoard() {
    try {
      const boardNo = this.params.no;

      const boardConfirm = await BoardStorage.readByOneBoard(boardNo);
      if (!boardConfirm.length) {
        return {
          success: false,
          msg: `${boardNo}번 게시글은 없는 게시글 입니다.`,
        };
      }

      const deletedBoard = await BoardStorage.deleteBoard(boardNo);
      if (deletedBoard) {
        return { success: true, msg: "게시글 삭제가 완료되었습니다." };
      } else {
        return { success: false, msg: "게시글 삭제가 실패하였습니다." };
      }
    } catch (err) {
      throw { err };
    }
  }
}

module.exports = Board;
