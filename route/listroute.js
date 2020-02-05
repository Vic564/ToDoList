//importerar moduler
const express = require('express');

const User = require('../model/user');

const router = express.Router();

//sätter routes för url med expressfunktion
router.get("/", (request, response) => {
    response.status(200).json({
        "answer": "OK",
        "data": "tom"
    });
});

router.post("/", (request, response) => {
    response.status(200).json({
        "answer": "OK"
    });
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
