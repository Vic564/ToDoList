const express = require('express');

const User = require('../model/user');

const router = express.Router();

function validateUser(body) {
    return new Promise((resolve, reject) => {
        User.find({username: body.username, password: body.password}, (error, user) => {
            if (error) {
                reject(error);
            }
            if (user.length > 0) {
                resolve(user[0]._id);
            }
            else {
                let error = new Error();
                error.name = "WRONG USERNAME OR PASSWORD"
                reject(error);
            }
        });
    });
}

router.get("/", (request, response) => {
    response.render("index");
});

router.post("/", (request, response) => {
    const body = request.body;
    validateUser(body)
    .then(result => {
        return result;
    })
    .then(id => {
        response.status(200).json({
            "answer": "OK",
            "path": `/${id}`
        });
    })
    .catch(error => {
        console.error(error);
        response.status(400).json({
            "answer": error.name
        });
    }); 
});

module.exports = router;
