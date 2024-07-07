const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

//response home page 
router.get('/', (req, res) => {
    res.send('')
})
//for labels route
router.get('/labels', Controller.showLabels)
router.get('/labels/detail', Controller.showLabelsDetails)

//for song routes
router.get('/songs', Controller.showSong)
router.get('/songs/add', Controller.showFormSong)
router.post('/songs/add', Controller.addSong)
router.get('/songs/:id', Controller.searchSongByID)
router.get('/songs/:id/edit', Controller.showFormSongEditById)
router.post('/songs/:id/edit', Controller.editSong)
router.get('/songs/:id/delete', Controller.deleteSong)
router.get('/songs/:id/vote', Controller.addVote)

module.exports = router