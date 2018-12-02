const gigService = require('../services/gig-service')
const baseUrl = '/api/gig'


function addGigRoutes(app) {

    //gig list
<<<<<<< HEAD
    app.get(baseUrl, (req, res) => {
        gigService.query()
=======
    app.get(`${baseUrl}`, (req, res) => {   
        gigService.query(req.query)
>>>>>>> c925ec49ab6a04586273eff951c542fb0b0fdd07
            .then(gigs => res.json(gigs))
    })

    // app.get(`${baseUrl}/category/:categoryName`, (req, res)=>{
    //     const category = req.params.categoryName
    //     gigService.query(category)
    //     .then(gigs => res.json(gigs))
    // })

    //single gig
    app.get(`${baseUrl}/:gigId`, (req, res) => {
        const gigId = req.params.gigId
        gigService.getById(gigId)
            .then(gig => res.json(gig))
    })

    //delete
    app.delete(`${baseUrl}/:gigId`, (req, res) => {
        const gigId = req.params.gigId
        gigService.remove(gigId)
            .then(() => res.end(`Gig ${gigId} was deleted`))
    })

    //add gig
    app.post(baseUrl, (req, res) => {
        const gig = req.body
        gigService.add(gig)
            .then(gig => res.json(gig))
    })

    //update gig
    app.put(`${baseUrl}/:gigId`, (req, res) => {
        const gig = req.body
        gigService.update(gig)
            .then(gig => res.json(gig))
    })

}

module.exports = addGigRoutes