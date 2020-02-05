const express = require('express');
const cors = require('cors');

const user = require('./model/user');

const listRouter = require('./route/listroute');

const notFound = require('./route/notfound');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(listRouter);
app.use(notFound);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`SERVER LISTENING ON PORT: ${port}`));
