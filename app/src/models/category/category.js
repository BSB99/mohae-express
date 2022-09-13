const CategoryStorage = require("../category/categoryStorage");

class Category {
    constructor(req) {
        this.params = req.params;
        this.body = req.body;
    }

    async readCategory() {
        try {
            const categoryNo = this.params.no;

            const categoryConfirm = await category.confirm(categoryNo);
            if (!categoryConfirm.success) {
                return categoryConfirm;
            }

            const categories = await CategoryStorage.readCategory(categoryNo);

            return { success: true, categories };
        } catch(err) {
            throw {err};
        }
    }
}

const category = {
    confirm: async (categoryNo) => {
        const categoryConfirm = await CategoryStorage.categoryConfirm(categoryNo);
        if (!categoryConfirm.length) {
            return { success: false, msg: `${categoryNo}번 카테고리가 존재하지 않습니다.` };
        }

        return { success: true };
    }
}

module.exports = {Category, category};