const express = require('express');

const User = require('../model/user');

const Task = require('../model/task');

const router = express.Router();

const getList = (id) => {
    return new Promise((resolve, reject) => {
        Task.find({userid: id}, {}, {sort: {prio: 1} }, (error, taskList) => {
            if (error) {
                reject(error);
            }
            resolve(taskList);
        });
    });
}

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

const createTask = (userid, task) => {
    return new Promise((resolve, reject) => {
        if ((task.note !== undefined) && (task.prio !== undefined)) {
            getList(userid)
            .then(taskList => {
                const maxPrio = taskList.length + 1;
                if (task.prio > maxPrio) {
                    task.prio = maxPrio;
                }
                else if (task.prio <= 0) {
                    task.prio = 1;
                }
                const taskPrio = {
                    new: task.prio,
                    old: maxPrio
                };
                updatePrioIncrement(userid, taskPrio)
                .then(result => {
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
                })
                .catch(error => {
                    console.error(error);
                });
            })
            .catch(error => {
                let e = new Error();
                e.name = "SOMETHING WENT WRONG";
                reject(e);
            })
        }
        else {
            let error = new Error();
            error.name = "NOTE AND/OR PRIO MISSING";
            reject(error);
        }
    });
}

const updatePrioIncrement = (userid, taskPrio) => {
    return new Promise((resolve, reject) => {
        Task.updateMany({userid: userid, prio: { $gte: taskPrio.new, $lt: taskPrio.old }}, { $inc: { prio: 1 } }, error => {
            if (error) {
                reject(error);
            }
            else {
                resolve(true);
            }
        });
    });
}

const updatePrioDecrement = (userid, taskPrio) => {
    return new Promise((resolve, reject) => {
        Task.updateMany({userid: userid, prio: { $lte: taskPrio.new, $gt: taskPrio.old }}, { $inc: { prio: -1 } }, error => {
            if (error) {
                reject(error);
            }
            else {
                resolve(true);
            }
        });
    });
}

const getTask = (taskid) => {
    return new Promise((resolve, reject) => {
        Task.find({_id: taskid}, (error, task) => {
            if (error) {
                reject(error);
            }
            resolve(task[0]);
        });
    });
}

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

const editTask = (userid, task) => {
    return new Promise((resolve, reject) => {
        if ((task.note !== undefined) && (task.prio !== undefined)) {
            getList(userid)
            .then(async taskList => {
                return await taskList.length;
            })
            .then(async maxPrio => {
                const oldPrio = await getTask(task.id)
                .then(async listObject => {
                    return await listObject.prio;
                })
                .catch(error => console.error(error));
                if (task.prio > maxPrio) {
                    task.prio = maxPrio;
                }
                else if (task.prio <= 0) {
                    task.prio = 1;
                }
                
                return oldPrio;
            })
            .then(async oldPrio => {
                const taskPrio = {
                    new: task.prio,
                    old: oldPrio
                }
                
                await updatePrioIncrement(userid, taskPrio)
                .catch(error => console.error(error));
                return taskPrio;
            })
            .then(async taskPrio => {
                await updatePrioDecrement(userid, taskPrio)
                .catch(error => console.log(error));
                return taskPrio;
            })
            .then(async (taskPrio) => {
                await Task.updateOne({_id: task.id}, {note: task.note, prio: taskPrio.new, modified: Date.now()}, error => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
            })
            .catch(error => console.error(error));
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

router.put("/:userid", (request, response) => {
    isValidUser(request.params.userid)
    .then(id => {
        editTask(request.params.userid, request.body)
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

module.exports = router;
