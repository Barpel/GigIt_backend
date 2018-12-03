const socketService = require('../services/socket-service')

function connectSockets(io) {
    
    io.on('connection', function (socket) {
        console.log('a user connected')
    
        socket.on('test', function (data) {
            console.log('this is a test:', data)
            .then(res => socket.emit('doubleTest', res))
            
        });
        socket.on('disconnect', function () {
            console.log('user disconnected')
        });
    });
}

module.exports = connectSockets