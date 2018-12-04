const socketService = require('../services/chat-service')
const baseUrl = '/api/chat'


function addChatRoutes(app) {
    //chat list
    app.get(`${baseUrl}`, (req, res) => {   
        socketService.query(req.query)
            .then(chats => res.json(chats))
    })

    // app.get(`${baseUrl}/category/:categoryName`, (req, res)=>{
    //     const category = req.params.categoryName
    //     socketService.query(req.query)
    //     .then(chats => res.json(chats))
    // })

    //single chat
    app.get(`${baseUrl}/:chatId`, (req, res) => {
        const chatId = req.params.chatId
        socketService.getById(chatId)
            .then(chat => res.json(chat))
    })

    //delete
    app.delete(`${baseUrl}/:chatId`, (req, res) => {
        const chatId = req.params.chatId
        socketService.remove(chatId)
            .then(() => res.end(`chat ${chatId} was deleted`))
    })

    //add chat
    app.post(baseUrl, (req, res) => {
        const chat = req.body
        socketService.add(chat)
            .then(chat => res.json(chat))
    })

    //update chat
    app.put(`${baseUrl}/:chatId`, (req, res) => {
        const chat = req.body
        socketService.update(chat)
            .then(chat => res.json(chat))
    })

}

module.exports = addChatRoutes