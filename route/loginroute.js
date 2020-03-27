const router = require('express').Router();

const {loginController} = require('./controller/loginroute');

router.get("/", (request, response) => {
    response.render("index");
});

router.post("/", (request, response) => {
    const body = request.body;
    loginController.validateUser(body)
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
