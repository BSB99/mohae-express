const User = require("../../models/user/user");

const process = {
    signUp: async (req, res) => {
        try {
            const user = new User(req);
            const response = await user.signUp(req);

            if (response.success) {
                return res.status(200).json(response);
              } else {
                return res.status(400).json(response);
              };
        } catch(err) {
            throw res.status(500).json(err);
        };
    },

    signIn: async (req, res) => {
        try {
            const user = new User(req);
            const response = await user.signIn(req);

            if (response.success) {
                return res.status(200).json(response);
              } else {
                return res.status(400).json(response);
              };
        } catch(err) {
            throw res.status(500).json(err);
        };
    }
}

module.exports = { process };