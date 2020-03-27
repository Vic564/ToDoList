const User = require('./model/user');

const Task = require('./model/task');

const {CONFIG} = require('./constant');

const createUser = () => {
    //skapar promise
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
                console.log(`EXAMPLE USER: ${exampleUser.username} SAVED`);
                resolve(exampleUser.username);
            }
        });
    });
}

const createTasks = (username) => {
    return new Promise((resolve, reject) => {
        User.find({username: username}, (error, user) => {
            if (error) {
                reject(error);
            }
            else {
                const taskList = ["eat", "sleep", "repeat"];

                for (let i = 0; i < taskList.length; ++i) {
                    const task = new Task({
                        userID: user[0]._id,
                        note: taskList[i],
                        status: false,
                        prio: i + 1
                    });

                    task.save(error => {
                        if (error) {
                            throw error;
                        }
                        console.log('TASK SAVED');
                    });
                }
                resolve(true);
            }
        });
    });
}

createUser()
    .then(username => createTasks(username))
    .catch(err => console.error(err));
