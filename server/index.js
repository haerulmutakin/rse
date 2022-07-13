const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parser = require('body-parser');
const appRoutes = require('./routes')

const App = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

App.use(cors(corsOptions));
App.use(parser.json());
App.use(parser.urlencoded({extended: true}));

App.use('/api/v1', appRoutes)

mongoose.connect('mongodb://localhost:27017/react-socket-node', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Successfully connected to mongodb')
    }
})

App.listen(3001, () => {
    console.log('App is running')
})