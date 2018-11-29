'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
app.use(express.static('public'))
app.use(cookieParser());
app.use(session({
    secret: 'gotta gigit',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.get('/', (req, res) => {
    res.send('HI!!')
})
const addGigRoutes = require('./routes/gig-route')
const addUserRoutes = require('./routes/user-route')


addGigRoutes(app)
addUserRoutes(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`You're now on p-po-por-port ${PORT}`))