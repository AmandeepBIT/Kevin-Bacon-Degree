const express = require('express')
const router = express.Router()
const { getActorDetails } = require('../controller/IMDB/actorController')
const { getMoviesByActorName, getMovieDetailsByActorName } = require('../controller/IMDB/movieController')
const { getAllActors, getActorHistory, findActorBasedDegree } = require('../controller/baseController')

// *************** IMDB BASED APIS ************** //
router.get('/imdb/search', getActorDetails)
router.get('/imdb/movieList', getMoviesByActorName)
router.get('/imdb/movieDetail', getMovieDetailsByActorName)

// *************** LOCAL BASED APIS ************** //
router.get('/local/actor-list', getAllActors)
router.get('/local/actor-history', getActorHistory)
router.get('/local/degree-away', findActorBasedDegree)

module.exports = router