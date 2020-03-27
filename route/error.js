const router = require('express').Router();
const {ROUTE, VIEW} = require('../constant');

router.get(ROUTE.error, (request, response) => {
    response.render(VIEW.error, {errormsg: request.query.errormsg || '404 NOT FOUND'});
});

module.exports = router;
