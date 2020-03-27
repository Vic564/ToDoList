const express = require('express');
const cors = require('cors');

const {allRoutes} = require('./route/allroutes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/public', express.static(__dirname + '/public'));

app.set("views", "views" );

app.set("view engine", "ejs");

for (const route of allRoutes) {
    app.use(route);
}

module.exports = {app};
