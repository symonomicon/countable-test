const express = require('express')
const app = express()
const port = 3000
const { sequelize } = require('./db');
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(routes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    sequelize.authenticate()
        .then(() => {
            console.log("Connected to database")
        })
})