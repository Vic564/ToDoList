//importerar moduler
const express = require('express');

const Task = require('../model/task');

const router = express.Router();

//funktion som tar in data "request" <---- input i clienten
function getList(id) {
    //skapar promise
    return new Promise((resolve, reject) => {
        //letar efter matchning i databasen genom modellen Task
        Task.find({userid: id}, (error, user) => {
            if (error) {
                //vid "error" reject som fångas i ".catch-funktion" .catch((err) => {console.error(err);});
                reject(error);
            }
            //vid "resolve" som fångas i ".then-funktion" .then((result) => { //gör något med result });
            resolve(user);
        });
    });
}

router.get("/:userid", (request, response) => {
    getList(request.params.userid)
    .then(list => {
        response.render("list", {list: list});
    })
    .catch(error => console.error(error));
});

//exporterar modul:"router" (URL handling code) => {skickar data (post, get) till adress} och hur det ska hanteras (response)
module.exports = router;
