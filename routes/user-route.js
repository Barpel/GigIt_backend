const userService = require('../services/user-service')
const baseUrl = '/api/user'

function addRoutes(app) {
    app.get(`${baseUrl}`, (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })

    app.get(`${baseUrl}/:userId`, (req, res) => {
        const userId = req.params.userId
        userService.getById(userId)
            .then(user => {
                res.json(user)
            })
    })

    app.post(`${baseUrl}/login`, (req, res) => {
        const userCreds = req.body
        if(!userCreds.password) {
            var user = req.session.user
            res.json(user)
        }
        else {
            userService.login(userCreds)
            .then(user => {
                if(user) {
                    req.session.user = user
                    res.json(user)
                }
                else res.status(400).send('Wrong Creds')                
            })
        }
    })

    app.post(`${baseUrl}/logout`, (req,res) => {
        req.session.destroy()
        res.end()   
    })

    app.delete(`${baseUrl}/:userId`, (req, res) => {
        const userId = req.params.userId;
        userService.remove(userId)
            .then(() => res.end(`User ${userId} Deleted `))
    })

    app.post(baseUrl, (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => {
                req.session.user = user
                res.json(user)
            })
            .catch(err => {
                res.status(401).send('username taken')
            })
    })


    app.put(`${baseUrl}/:userId`, (req, res) => {
        const user = req.body;
        userService.update(user)
            .then(user => res.json(user))
    })
}

module.exports = addRoutes