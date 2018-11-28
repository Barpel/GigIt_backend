const userService = require('../services/user-service')
const baseUrl = '/user'

function addRoutes(app) {
    app.get(baseUrl, (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })

    app.get(`${baseUrl}/:id`, (req, res) => {
        const userId = req.params._id
        userService.getById(userId)
            .then(user => res.json(user))
    })

    app.get(`${baseUrl}/login`, (req, res) => {
        const userCreds = req.params.userCreds
        userService.checkLogin(userCreds)
            .then(user => res.json(user))
    })

    app.delete(`${baseUrl}/:userId`, (req, res) => {
        const userId = req.params.userId;
        userService.remove(userId)
            .then(() => res.end(`User ${userId} Deleted `))
    })

    app.post(`${baseUrl}`, (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => {
                res.json(user)
            })
    })


    app.put(`${baseUrl}/:userId`, (req, res) => {
        const user = req.body;
        userService.update(user)
            .then(user => res.json(user))
    })
}

module.exports = addRoutes