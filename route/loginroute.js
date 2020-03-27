const router = require('express').Router();

const {loginController} = require('./controller/loginroute');

const {ROUTE} = require('../constant');

router.get(ROUTE.index, (request, response) => {
    response.render("index");
});

router.post(ROUTE.index, (request, response) => {
    const body = request.body;
    loginController.validateUser(body)
        .then(id => {
            response.status(200).json({
                "answer": "OK",
                "path": `${ROUTE.list}/${id}`
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
