const express = require('express')
const app = express()
const port = 3000
const { sequelize } = require('./db');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    sequelize.authenticate()
        .then(() => {
            console.log("Connected to database")
        })
})