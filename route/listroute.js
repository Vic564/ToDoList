const express = require('express');

const router = express.Router();

router.get("/", (request, response) => {
    response.status(200).json({
        "answer": "OK"
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

module.exports = router;

