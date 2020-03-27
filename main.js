const mongoose = require('mongoose');

const {CONFIG} = require('./constant');
const {app} = require('./app');

mongoose.connect(CONFIG.MONGO.connection, CONFIG.MONGO.options)
    .then(() => {
        app.listen(CONFIG.PORT, () => console.log(`SERVER LISTENING ON PORT: ${CONFIG.PORT}`));
    })
    .catch(error => console.error(error));
