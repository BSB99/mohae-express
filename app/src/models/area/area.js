const AreaStorage = require("./areaStorage");

const area = {
    confirm: async (areaNo) => {
        const areaConfirm = await AreaStorage.areaConfirm(areaNo);
        if (!areaConfirm.length) {
            return {success: false, msg: `${areaNo}번 지역이 존재하지 않습니다.`}
        }

        return {success: true};
    }
}

module.exports = {area};