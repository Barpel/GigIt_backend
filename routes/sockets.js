const chatService = require('../services/chat-service')

var gChats = chatService.query()
function connectSockets(io) {

    io.on('connection', function (socket) {
        console.log('a user connected')
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
            io.to('userSocket'+userId).emit('eventMsgToUser', eventMsg)
        })

        socket.on('disconnect', function () {
            console.log('user disconnected')
        });
    });
}

module.exports = connectSockets