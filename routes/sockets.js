const chatService = require('../services/chat-service')

var gChats = chatService.query()
function connectSockets(io) {
    
    io.on('connection', function (socket) {
        console.log('a user connected')
        var chatToUpdate
        socket.on('sendMsg', function (msg, chatId) {
            chatService.getById(chatId)
                .then(chat => {
                    console.log(chat)
                    // chatToUpdate = chat
                    chat.msgs.push(msg)
                    socket.join('chatRoom' + chatId)
                    io.to('chatRoom' + chatId).emit('sentMsg', {msg, chatId})
                    chatService.update(chat)
                })

            
        });
        socket.on('disconnect', function () {
            // console.log(chatToUpdate)
            // if(chatToUpdate) chatService.update(chatToUpdate)
            console.log('user disconnected')
        });
    });
}

module.exports = connectSockets