const {Category} = require("../../models/category/category");

const process = {
    readCategory: async (req, res) => {
        try {
            const category = new Category(req);
            const response = await category.readCategory(req);
            
            if (response.success) {
                return res.status(200).json(response);
              } else {
                return res.status(400).json(response);
              };
        } catch (err) {
            throw res.status(500).json(err);
        };
    }
}

module.exports = { process };