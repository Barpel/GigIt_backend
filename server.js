'use strict'

const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
// const history = require('connect-history-api-fallback'); //SHOULD ABLE TO REFRESH ON HEROKU

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
// app.use(history({                //SHOULD ABLE TO REFRESH ON HEROKU
//     rewrites: [
//       { from: /\/api\//, to: '/index.html'}  //HAVN'T CHECKED IF REGEXP AND PATH ARE RIGHT
//     ]
//   }));
app.use(express.static('dist'))
app.use(cookieParser());
app.use(session({
    secret: 'gotta gigit',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))




app.get('/api/hi', (req, res) => {
    console.log('on hi', req.session)
    res.send('HI!!')
})
const connectSockets = require ('./routes/sockets')
const addGigRoutes = require('./routes/gig-route')
const addUserRoutes = require('./routes/user-route')
const addChatRoutes = require('./routes/chat-route')


addGigRoutes(app)
addChatRoutes(app)
addUserRoutes(app)
connectSockets(io)

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => console.log(`You're now on p-po-por-port ${PORT}`))