require('dotenv').config();

const VIEW = {
    index: 'index',
    list: 'list',
    notfound: 'notfound',
    error: 'error'
}

const ROUTE = {
    index: '/',
    list: '/list',
    userID: '/list/:userID',
    userIDStatus: '/list/:userID/status',
    error: '/error',
    wildcard: '/*'
}

const mongodb = process.env.MONGODB || 'mongodb';
const dbUser = process.env.DBUSER || 'test';
const dbPassword = process.env.DBPASSWORD || 'test';
const dbHostname = process.env.DBHOSTNAME || 'localhost';
const dbName = process.env.DBNAME || 'todolistapp';
const dbQuery = process.env.DBQUERY || '';
const dbAuth = (process.env.DBAUTH == 'true') ? true : false;

const CONFIG = {
    PORT: process.env.PORT || 8080,
    MONGO: {
        connection: dbAuth ? `${mongodb}://${dbUser}:${dbPassword}@${dbHostname}/${dbName}?${dbQuery}`
        : `${mongodb}://${dbHostname}/${dbName}?${dbQuery}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    },
    EXAMPLE: {
        username: process.env.EXAMPLEUSERNAME || 'johndoe',
        password: process.env.EXAMPLEPASSWORD || '12345'
    }
}

module.exports = {VIEW, ROUTE, CONFIG};
