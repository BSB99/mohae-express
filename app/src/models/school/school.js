const SchoolStorage = require('./schoolStorage');

const school = {
    confirm: async (schoolNo) => {
        const schoolConfirm = await SchoolStorage.schoolConfirm(schoolNo);
        if (!schoolConfirm.length) {
            return { success: false, msg: `${schoolNo}번 학교가 존재하지 않습니다.` };
        }

        return { success: true };
    }
}

module.exports = { school };