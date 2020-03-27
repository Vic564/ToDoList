const User = require('../../model/user');

const loginController = {
    validateUser: (body) => {
        return new Promise((resolve, reject) => {
            User.findOne({username: body.username, password: body.password}, (error, user) => {
                if (error) {
                    reject(error);
                }
                if (user) {
                    resolve(user._id);
                }
                else {
                    let error = new Error();
                    error.name = "WRONG USERNAME OR PASSWORD"
                    reject(error);
                }
            });
        });
    }
};

module.exports = {loginController};
