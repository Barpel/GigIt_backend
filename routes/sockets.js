const chatService = require('../services/chat-service')

var gChats = chatService.query()
function connectSockets(io) {
    
    io.on('connection', function (socket) {
        console.log('a user connected')
        
        socket.on('sendMsg', function (msg, chatId) {
            chatService.getById(chatId)
                .then(chat => {
                    chat.msgs.unshift(msg)
                    socket.join('chatRoom' + chatId)
                    console.log(chatId)
                    io.to('chatRoom' + chatId).emit('sentMsg', {msg, chatId})
                })

            
        });
        socket.on('disconnect', function () {
            console.log('user disconnected')
        });
    });
}

module.exports = connectSockets