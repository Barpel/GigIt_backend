const gigService = require('../services/gig-service')

function addGigRoutes(app) {

    //gig list
    app.get('/gig', (req, res) => {
        gigService.query()
            .then(gigs => res.json(gigs))
    })

    //single gig
    app.get('/gig/:gigId', (req, res) => {
        const gigId = req.params.gigId
        gigService.getById(gigId)
            .then(gig => res.json(gig))
    })

    //delete
    app.delete('/gig/:gigId', (req, res) => {
        const gigId = req.params.gigId
        gigService.remove(gigId)
            .then(() => res.end(`Gig ${gigId} was deleted`))
    })

    //add gig
    app.post('/gig/:gigId', (req, res) => {
        const gig = req.body
        gigService.add(gig)
            .then(gig=> res.json(gig))
    })

    //update gig
    app.put('/gig/:gigId', (req, res) => {
        const gig = req.body
        gigService.update(gig)
            .then(gig => res.json(gig))
    })

}

module.exports = addGigRoutes