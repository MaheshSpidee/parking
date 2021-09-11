require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Parking = require('./src/routes/parking/routes');

var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('short'))


app.use('/parking', new Parking().getRouters())
app.get("/*", (req, res) => {
    return res.json({ code: 200, message: "Successfully executed.", data: null, error: null })
})

app.use(function (err, req, res, next) {
    return res.json({ code: 402, data: null, message: "Error", error: err.message })
});


app.listen(process.env.PORT, () => {
    console.log(`Server is listening at ${process.env.PORT}...`)
});


