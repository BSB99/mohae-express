const Board = require("../../models/board/board");

const process = {
  all: async (req, res) => {
    const board = new Board(req);
    const boards = await board.readAllBoards(req);
    return res.status(200).json(boards[0]);
  },

  readByOneBoard: async (req, res) => {
    try {
      const board = new Board(req);
      const response = await board.readByOneBoard(req);

      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  createBoard: async (req, res) => {
    try {
      const board = new Board(req);
      const response = await board.createBoard(req);

      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  updateBoard: async (req, res) => {
    try {
      const board = new Board(req);
      const response = await board.updateBoard(req);

      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  }
};

module.exports = { process };
