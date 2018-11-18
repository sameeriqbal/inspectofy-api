const express = require('express');
const MongoDB = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/default');
const port = 9999;
var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' });
app.use(jsonParser);
app.use(urlencodedParser);

MongoDB.MongoClient.connect(config.dburl, (err, database) => {
    if (err) {
        console.log(err)
    }
    else {
        const inspectorRouter = require('./routes/inspectorRouter')(app, database, config);
        const contactRouter = require('./routes/contactRouter')(app, database, config);
        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    }
})