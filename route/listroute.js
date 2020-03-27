const router = require('express').Router();
const {ROUTE, VIEW} = require('../constant');

const {listController} = require('./controller/listroute')

router.get(ROUTE.userID, (request, response) => {
    listController.isValidUser(request.params.userID)
        .then(id => listController.getList(id))
        .then(list => response.render("list", {list: list}))
        .catch(error => {
            console.error(error)
            response.status(400).json({
                "ansmwer": "ERROR",
                "error": error
            });
        });
});

router.post(ROUTE.userID, (request, response) => {
    listController.isValidUser(request.params.userID)
    .then(id => {
        listController.createTask(id, request.body)
        .then(result => {
            response.status(200).json({
                "answer": "TASK CREATED"
            });
        })
        .catch(error => {
            console.error(error)
            response.status(400).json({
                "answer": "ERROR",
                "error": error.name
            });
        });
    })
    .catch(error => {
        console.error(error)
        response.status(400).json({
            "answer": "ERROR",
            "error": error.name
        });
    });
});

router.delete(ROUTE.userID, (request, response) => {
    listController.isValidUser(request.params.userID)
    .then(id => {
        listController.deleteTask(request.body.taskID)
        .then(result => {
            response.status(200).json({
                "answer": `TASK ${request.body.taskID}DELETED`
            });
        })
        .catch(error => {
            console.error(error)
            response.status(400).json({
                "answer": "ERROR",
                "error": error.name
            });
        });
    })
    .catch(error => {
        console.error(error)
        response.status(400).json({
            "answer": "ERROR",
            "error": error.name
        });
    });
});

router.put(ROUTE.userID, (request, response) => {
    listController.isValidUser(request.params.userID)
    .then(id => {
        listController.editTask(request.params.userID, request.body)
        .then(result => {
            response.status(200).json({
                "answer": `TASK ${request.body.taskID} CHANGED`
            });
        })
        .catch(error => {
            console.error(error)
            response.status(400).json({
                "answer": "ERROR",
                "error": error.name
            });
        });
    })
    .catch(error => {
        console.error(error)
        response.status(400).json({
            "answer": "ERROR",
            "error": error.name
        });
    });
});

router.put(ROUTE.userIDStatus, (request, response) => {
    listController.isValidUser(request.params.userID)
    .then(id => {
        listController.toggleStatus(request.body)
        .then(result => {
            response.status(200).json({
                "answer": `TASK ${request.body.taskID} CHANGED`
            });
        })
        .catch(error => {
            console.error(error)
            response.status(400).json({
                "answer": "ERROR",
                "error": error.name
            });
        });
    })
    .catch(error => {
        console.error(error)
        response.status(400).json({
            "answer": "ERROR",
            "error": error.name
        });
    });
});

module.exports = router;
