const router = require('express').Router();
const url = require('url');
const {ROUTE} = require('../constant');

router.get(ROUTE.wildcard, (request, response) => {
    response.redirect(url.format({
        pathname: ROUTE.error,
        query: {
            errormsg: 'NOT FOUND'
        }
    }));
});

router.post(ROUTE.wildcard, (request, response) => {
    response.status(404).json({
        "answer": "NOT FOUND"
    });
});

router.put(ROUTE.wildcard, (request, response) => {
    response.status(404).json({
        "answer": "NOT FOUND"
    });
});

router.delete(ROUTE.wildcard, (request, response) => {
    response.status(404).json({
        "answer": "NOT FOUND"
    });
})

module.exports = router;
