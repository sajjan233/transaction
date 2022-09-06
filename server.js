const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const connaction = require('./config')[process.env.NODE_DEV || DEV]
const bodyparser = require('body-parser')


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())


mongoose.connect(connaction.DB)
    .then(() => {
        console.log("database connaction",true);
    })
    .catch((err) => {
        console.log('database connaction ',false);
    })


const allRoutes = require('./router/index');
app.use('/',allRoutes)




app.listen(connaction.PORT, () => {
    console.log("server run on port",connaction.PORT);
})