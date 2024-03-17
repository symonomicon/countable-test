const express = require('express')
const app = express()
const port = 3000
const { sequelize } = require('./db');
const routes = require('./routes')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    sequelize.authenticate()
        .then(() => {
            console.log("Connected to database")
        })
})