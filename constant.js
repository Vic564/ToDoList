require('dotenv').config();

const VIEW = {
    index: 'index',
    list: 'list',
    notfound: 'notfound'
}

const ROUTE = {
    index: '/',
    userID: '/:userID',
    userIDStatus: '/:userID/status',
    error: '/error',
    wildcard: '/*'
}

const CONFIG = {
    PORT: process.env.PORT || 8080,
    MONGO: {
        connection: `mongodb://${process.env.DBHOSTNAME || 'localhost'}/${process.env.DBNAME || 'todolistapp'}`,
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
