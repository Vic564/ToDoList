const loginRouter = require('./loginroute');
const listRouter = require('./listroute');
const error = require('./error');
const notFound = require('./notfound');

const allRoutes = [
    loginRouter,
    error,
    listRouter,
    notFound //*alltid sist
];

module.exports = {allRoutes};
