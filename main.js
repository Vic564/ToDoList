const express = require('express');
const cors = require('cors');

const User = require('./model/user');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port: ${port}`));
