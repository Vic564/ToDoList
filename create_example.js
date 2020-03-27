const mongoose = require('mongoose');

const User = require('./model/user');
const Task = require('./model/task');
const {CONFIG} = require('./constant');

const deleteUser = () => {
    return new Promise((resolve, reject) => {
        User.deleteOne({username: CONFIG.EXAMPLE.username}, error => {
            if (error) {
                reject(error);
            } else {
                console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} DELETED`);
                resolve();
            }
        });
    });
}

const deleteTasks = () => {
    return new Promise((resolve, reject) => {
        User.findOne({username: CONFIG.EXAMPLE.username}, (error, user) => {
            if (error) {
                reject(error);
            }
            else {
                if (user) {
                    Task.deleteMany({userID: user._id}, error => {
                        if (error) {
                            reject(error);
                        }
                    });
                }
                console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} TASKS DELETED`);
                resolve();
            }
        });
    });
}

const createUser = () => {
    return new Promise((resolve, reject) => {
        const exampleUser = new User({
            username: CONFIG.EXAMPLE.username,
            password: CONFIG.EXAMPLE.password
        });
        exampleUser.save(error => {
            if (error) {
                reject(error);
            }
            else {
                console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} SAVED`);
                resolve();
            }
        });
    });
}

const createTasks = () => {
    return new Promise((resolve, reject) => {
        User.findOne({username: CONFIG.EXAMPLE.username}, (error, user) => {
            if (error) {
                reject(error);
            }
            else {
                const taskList = ['eat', 'sleep', 'repeat'];
                for (const [i, note] of taskList.entries()) {
                    const task = new Task({
                        userID: user._id,
                        note: note,
                        status: false,
                        prio: i + 1
                    });
                    task.save(error => {
                        if (error) {
                            reject(error);
                        }
                    });
                }
                console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} TASKS SAVED`);
                resolve();
            }
        });
    });
}

mongoose.connect(CONFIG.MONGO.connection, CONFIG.MONGO.options)
    .then(() => deleteTasks())
    .then(() => deleteUser())
    .then(() => createUser())
    .then(() => createTasks())
    .then(() => mongoose.connection.close())
    .catch(err => console.error(err));
