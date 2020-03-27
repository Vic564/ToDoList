const loginRouter = require('./loginroute');
const listRouter = require('./listroute');
const notFound = require('./notfound');

const allRoutes = [
    loginRouter,
    listRouter,
    notFound
];

module.exports = {allRoutes};
