const chatService = require('../services/chat-service')

function connectSockets(io) {

    io.on('connection', function (socket) {
        console.log('a user connected')

        socket.on('connectToChat', function (chatId) {
            socket.join('chatRoom' + chatId)
        })
        
        socket.on('sendMsg', function (msg, chatId) {
            chatService.getById(chatId)
                .then(chat => {
                    chat.msgs.push(msg)
                    socket.join('chatRoom' + chatId)
                    io.to('chatRoom' + chatId).emit('sentMsg', { msg, chatId })
                    chatService.update(chat)
                })
        });

        socket.on('newUserSocket', function (userId) {
            console.log('opening new socket for:', userId)
            socket.join('userSocket' + userId)
        })
        socket.on('emitToUser', function (eventMsg, userId) {
            io.to('userSocket'+userId).emit('emitEventToUser', eventMsg)
        })
        socket.on('emitNewChatMsg', function (eventMsg, userId) {
            io.to('userSocket'+userId).emit('emitChatMsgToUser', eventMsg)
        })

        socket.on('logoutUser', function (userId) {
            console.log('leaving socket', userId)
            socket.leave('userSocket' + userId)
        })

        socket.on('disconnect', function () {
            console.log('user disconnected')
        });
    });
}

module.exports = connectSockets