// require('./config/config')

const express = require('express')
const app = express()
app.use(express.json())

require('dotenv').config()

const port = process.env.PORT || 3000

/* TEST SERVER IS RUNNING */
app.get('/', (req, res) => {
    res.send('SERVER STARTED')
})

/* Routers */
const imdbRouter = require('./server/routes/apiRoutes')
app.use('/api', imdbRouter)

//configure the server port
app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})

module.exports = app
