//importerar moduler
const express = require('express');

const User = require('../model/user');

const Task = require('../model/task');

const router = express.Router();

//funktion som tar in data "request" <---- input i clienten
const getList = (id) => {
    //skapar promise
    return new Promise((resolve, reject) => {
        //letar efter matchning i databasen genom modellen Task
        Task.find({userid: id}, (error, taskList) => {
            if (error) {
                //vid "error" reject som fångas i ".catch-funktion" .catch((err) => {console.error(err);});
                reject(error);
            }
            //vid "resolve" som fångas i ".then-funktion" .then((result) => { //gör något med result });
            resolve(taskList);
        });
    });
}

//kollar om användaren finns
const isValidUser = (userid) => {
    return new Promise((resolve, reject) => {
        User.find({_id: userid}, (error, user) => {
            if (error) {
                reject(error);
            }
            else if (user.length > 0) {
                resolve(user[0]._id);
            }
            else {
                let error = new Error();
                error.name = "USER DOES NOT EXIST"
                reject(error);
            }
        });
    });
}

//skapar "task" i databasen
const createTask = (userid, task) => {
    return new Promise((resolve, reject) => {
        if ((task.note !== undefined) && (task.prio !== undefined)) {
            const newTask = new Task({
                userid: userid,
                note: task.note,
                status: false,
                prio: task.prio
            });

            newTask.save(error => {
                if (error) {
                    reject(error);
                }
                resolve(true);
            });
        }
        else {
            let error = new Error();
            error.name = "NOTE AND/OR PRIO MISSING";
            reject(error);
        }
    });
}

//tar bort task i databasen
const deleteTask = (taskid) => {
    return new Promise((resolve, reject) => {
        if (taskid !== undefined) {
            Task.deleteOne({_id: taskid}, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        }
        else {
            let error = new Error();
            error.name = "TASK ID MISSING";
            reject(error);
        }
    });
}

//ändrar task i databasen
const editTask = (task) => {
    return new Promise((resolve, reject) => {
        if ((task.note !== undefined) && (task.prio !== undefined)) {
            Task.updateOne({_id: task.id}, {note: task.note, prio: task.prio, modified: Date.now()}, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            })
        }
        else {
            let error = new Error();
            error.name = "NOTE AND/OR PRIO AND/OR STATUS MISSING";
            reject(error);
        }
    });
}

const toggleStatus = (task) => {
    return new Promise((resolve, reject) => {
        getCurrentStatus(task.id)
        .then(task => {
            if (task.status !== undefined) {
                Task.updateOne({_id: task._id}, {status: !task.status, modified: Date.now()}, error => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                })
            }
            else {
                let error = new Error();
                error.name = "STATUS MISSING";
                reject(error);
            }
        })
        .catch(error => {
            console.error(error)
            reject(error);
        });
    });
}

const getCurrentStatus = (id) => {
    return new Promise((resolve, reject) => {
        Task.find({_id: id}, (error, task) => {
            if (error) {
                reject(error);
            }
            resolve(task[0]);
        });
    });
}

//hämtar användarens lista och skickar till ejs
router.get("/:userid", (request, response) => {
    isValidUser(request.params.userid)
    .then(id => {
        getList(id)
        .then(list => {
            response.render("list", {list: list});
        })
    })
    .catch(error => {
        console.error(error)
        response.status(400).json({
            "ansmwer": "ERROR",
            "error": error
        });
    });
});

//hanterar post-request och anropar funktionen som verkställer
router.post("/:userid", (request, response) => {
    isValidUser(request.params.userid)
    .then(id => {
        createTask(id, request.body)
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

//hanterar delete-request och anropar funktionen som verkställer
router.delete("/:userid", (request, response) => {
    isValidUser(request.params.userid)
    .then(id => {
        deleteTask(request.body.taskid)
        .then(result => {
            response.status(200).json({
                "answer": `TASK ${request.body.taskid}DELETED`
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

//hanterar put-request och anropar funktionen som verkställer
router.put("/:userid", (request, response) => {
    isValidUser(request.params.userid)
    .then(id => {
        editTask(request.body)
        .then(result => {
            response.status(200).json({
                "answer": `TASK ${request.body.taskid} CHANGED`
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

router.put("/:userid/status", (request, response) => {
    isValidUser(request.params.userid)
    .then(id => {
        toggleStatus(request.body)
        .then(result => {
            response.status(200).json({
                "answer": `TASK ${request.body.taskid} CHANGED`
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

//exporterar modul:"router" (URL handling code) => {skickar data (post, get) till adress} och hur det ska hanteras (response)
module.exports = router;
