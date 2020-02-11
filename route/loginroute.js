//importerar moduler
const express = require('express');

const User = require('../model/user');

const router = express.Router();

//funktion som tar in data "request" <---- input i clienten
function validateUser(body) {
    //skapar promise
    return new Promise((resolve, reject) => {
        //letar efter matchning i databasen genom modellen User
        User.find({username: body.username, password: body.password}, (error, user) => {
            if (error) {
                //vid "error" reject som fångas i ".catch-funktion" .catch((err) => {console.error(err);});
                reject(error);
            }
            //vid "resolve" som fångas i ".then-funktion" .then((result) => { //gör något med result });
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

//sätter routes för url med expressfunktion
router.get("/", (request, response) => {
    response.render("index");
});

//post från klient
router.post("/", (request, response) => {
    const body = request.body;
    //inväntar promise från "validateUser()"
    validateUser(body)
    .then(result => {
        return result;
    })
    //id-argumentet hämtas från tidigare .then()
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
