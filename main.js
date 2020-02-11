//variablar som importerar moduler
const express = require('express');
const cors = require('cors');

//...egna
const loginRouter = require('./route/loginroute');

const listRouter = require('./route/listroute');

const notFound = require('./route/notfound');

//laddar in environmentvariablar från .env-filen
require('dotenv').config();

//initierar express
const app = express();

//använder json i express
app.use(express.json());

//sätter headers för åtkomst i webbläsaren?
app.use(cors());

//använder "public-mappen" för offentliga filer
app.use('/public', express.static(__dirname + '/public'));

//använder "views" i mappen "views"
app.set("views", "views" );
//använder motorn "ejs"
app.set("view engine", "ejs");

//använder "routes" för url:get/post/put/delete
app.use(loginRouter);
app.use(listRouter);
app.use(notFound);

//sätter port som servern skall lyssna på från env-variabel eller alt.
const port = process.env.PORT || 3000;

//startar server
app.listen(port, () => console.log(`SERVER LISTENING ON PORT: ${port}`));
