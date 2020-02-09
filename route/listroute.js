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
            resolve(user);
        });
    });
}
//sätter routes för url med expressfunktion
router.get("/", (request, response) => {
    response.render("index");
});

router.post("/", (request, response) => {
    const body = request.body;
    validateUser(body)
    .then(result => {
        if (result.length > 0) {
            response.status(200).json({
                "answer": "OK",
                "userdata": result
            });
        }
        else {
            response.status(400).json({
                "answer": "Wrong USERNAME or PASSWORD"
            });
        }
    })
    .catch(error => console.error(error));
        
});

router.put("/", (request, response) => {
    response.status(200).json({
        "answer": "OK"
    });
});

router.delete("/", (request, response) => {
    response.status(200).json({
        "answer": "OK"
    });
})

//exporterar modul:"router" (URL handling code) => {skickar data (post, get) till adress} och hur det ska hanteras (response)
module.exports = router;
