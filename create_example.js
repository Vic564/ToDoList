const User = require('./model/user');

const Task = require('./model/task');

require('dotenv').config();

function createUser() {
    //skapar promise
    return new Promise((resolve, reject) => {
        const exampleUser = new User({
            username: process.env.EXAMPLEUSERNAME || 'johndoe',
            password: process.env.EXAMPLEPASSWORD || '12345'
        });
        exampleUser.save(error => {
            if (error) {
                reject(error);
            }
            console.log(`EXAMPLE USER: ${exampleUser} SAVED`);
            resolve(exampleUser.username);
        });
    });
}

function createTasks(username) {
    return new Promise((resolve, reject) => {
        User.find({username: username}, (error, user) => {
            if (error) {
                reject(error);
            }

            const taskList = ["eat", "sleep", "repeat"];

            for (let i = 0; i < taskList.length; ++i) {
                const task = new Task({
                    userid: user[0]._id,
                    note: taskList[i],
                    status: false,
                    prio: i
                });

                task.save(error => {
                    if (error) {
                        throw error;
                    }
                    console.log('TASK SAVED');
                });
            }
            resolve(true);
        });
    });
}

createUser()
.then(username => {
    createTasks(username);
})
.catch(err => console.log(err));
