const CategoryStorage = require("../category/categoryStorage");

class Category {
    constructor(req) {
        this.params = req.params;
        this.body = req.body;
    }
}

const category = {
    confirm: async (categoryNo) => {
        const categoryConfirm = await CategoryStorage.categoryConfirm(categoryNo);
        if (!categoryConfirm.length) {
            return { success: false, msg: `${categoryNo}번 카테고리가 존재하지 않습니다.` };
        }
    }
}

module.exports = {Category, category};