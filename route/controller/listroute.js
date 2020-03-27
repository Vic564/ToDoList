const User = require('../../model/user');
const Task = require('../../model/task');

const listController = {
    getList: (id) => {
        return new Promise((resolve, reject) => {
            Task.find({userID: id}, {}, {sort: {prio: 1} }, (error, taskList) => {
                if (error) {
                    reject(error);
                }
                resolve(taskList);
            });
        });
    },
    isValidUser: (userID) => {
        return new Promise((resolve, reject) => {
            User.findOne({_id: userID}, (error, user) => {
                if (error) {
                    reject(error);
                }
                else if (user) {
                    resolve(user._id);
                }
                else {
                    let error = new Error();
                    error.name = "USER DOES NOT EXIST"
                    reject(error);
                }
            });
        });
    },
    createTask: (userID, task) => {
        return new Promise((resolve, reject) => {
            if ((task.note !== undefined) && (task.prio !== undefined)) {
                listController.getList(userID)
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
                    listController.updatePrioIncrement(userID, taskPrio)
                    .then(result => {
                        const newTask = new Task({
                            userID: userID,
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
    },
    updatePrioIncrement: (userID, taskPrio) => {
        return new Promise((resolve, reject) => {
            Task.updateMany({userID: userID, prio: { $gte: taskPrio.new, $lt: taskPrio.old }}, { $inc: { prio: 1 } }, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    },
    updatePrioDecrement: (userID, taskPrio) => {
        return new Promise((resolve, reject) => {
            Task.updateMany({userID: userID, prio: { $lte: taskPrio.new, $gt: taskPrio.old }}, { $inc: { prio: -1 } }, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    },
    getTask: (taskID) => {
        return new Promise((resolve, reject) => {
            Task.find({_id: taskID}, (error, task) => {
                if (error) {
                    reject(error);
                }
                resolve(task[0]);
            });
        });
    },
    deleteTask: (taskID) => {
        return new Promise((resolve, reject) => {
            if (taskID !== undefined) {
                Task.deleteOne({_id: taskID}, error => {
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
    },
    editTask: (userID, task) => {
        return new Promise((resolve, reject) => {
            if ((task.note !== undefined) && (task.prio !== undefined)) {
                listController.getList(userID)
                .then(async taskList => {
                    return await taskList.length;
                })
                .then(async maxPrio => {
                    const oldPrio = await listController.getTask(task.id)
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
                    
                    await listController.updatePrioIncrement(userID, taskPrio)
                    .catch(error => console.error(error));
                    return taskPrio;
                })
                .then(async taskPrio => {
                    await listController.updatePrioDecrement(userID, taskPrio)
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
    },
    toggleStatus: (task) => {
        return new Promise((resolve, reject) => {
            listController.getCurrentStatus(task.id)
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
    },
    getCurrentStatus: (id) => {
        return new Promise((resolve, reject) => {
            Task.find({_id: id}, (error, task) => {
                if (error) {
                    reject(error);
                }
                resolve(task[0]);
            });
        });
    }
}

module.exports = {listController};
