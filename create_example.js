const mongoose = require('mongoose');

const User = require('./model/user');
const Task = require('./model/task');
const {CONFIG} = require('./constant');

const deleteUser = async () => {
    return new Promise(async (resolve, reject) => {
        await User.deleteOne({username: CONFIG.EXAMPLE.username}, async error => {
            if (error) {
                reject(error);
            }
            console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} DELETED`);
            resolve();
        });
    });
}

const deleteTasks = async () => {
    return new Promise(async (resolve, reject) => {
        await User.findOne({username: CONFIG.EXAMPLE.username}, async (error, user) => {
            if (error) {
                reject(error);
            }
            else if (user) {
                await Task.deleteMany({userID: user._id}, async error => {
                    if (error) {
                        reject(error);
                    }
                });
                console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} TASKS DELETED`);
            }
            resolve();
        });
    });
}

const saveModel = async (model) => {
    return new Promise(async (resolve, reject) => {
        await model.save(async error => {
            if (error) reject(error)
            resolve()
        });
    });
}

const createUser = async () => {
    return new Promise(async (resolve, reject) => {
        const exampleUser = new User({
            username: CONFIG.EXAMPLE.username,
            password: CONFIG.EXAMPLE.password
        });
        await saveModel(exampleUser).catch(error => reject(error));
        console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} SAVED`);
        resolve();
    });
}

const createTasks = async () => {
    return new Promise(async (resolve, reject) => {
        await User.findOne({username: CONFIG.EXAMPLE.username}, async (error, user) => {
            if (error) {
                reject(error);
            }
            else if (user) {
                const taskList = ['eat', 'sleep', 'repeat'];
                for await (const [i, note] of taskList.entries()) {
                    const task = new Task({
                        userID: user._id,
                        note: note,
                        status: false,
                        prio: i + 1
                    });
                    await saveModel(task).catch(error => reject(error));
                }
                console.log(`EXAMPLE USER ${CONFIG.EXAMPLE.username} TASKS SAVED`);
            }
            resolve();
        });
    });
}

mongoose.connect(CONFIG.MONGO.connection, CONFIG.MONGO.options)
    .then(async () => await deleteTasks())
    .then(async () => await deleteUser())
    .then(async () => await createUser())
    .then(async () => await createTasks())
    .then(async () => await Task.find({}))
    .then(async list => console.log(list))
    .catch(err => console.error(err))
    .then(async () => await mongoose.connection.close())
    .catch(err => console.error(err));
