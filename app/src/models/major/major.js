const MajorStorage = require('./majorStorage');

const major = {
    confirm: async (majorNo) => {
        const majorConfirm = await MajorStorage.majorConfirm(majorNo);
        if (!majorConfirm.length) {
            return { success: false, msg: `${majorNo}번 관심사가 존재하지 않습니다.` };
        }

        return { success: true };
    }
}

module.exports = { major };