const { StatusCodes } = require('http-status-codes')
const utils = require('../utils/utils')
const getActorListSchema = require('../schema/get-actor-list-schema')
const degreeSchema = require('../schema/degree-schema')
const {
  getActorList,
  getActorConnectedHistory,
  getActorNameById,
  checkDegreeAway,
} = require('../utils/helperFunctions')

// Get all the actors from local file
const getAllActors = (req, res, next) => {
  var list = getActorList()
  var finalOutput = list && list.length > 0 ? list : 'No actors found. Please load the data.'
  utils.successHandler(res, StatusCodes.OK, next, finalOutput)
}

// Get the history of actor from local file
const getActorHistory = (req, res, next) => {
  // Validate the schema. Actor Id is required for this
  const { error } = getActorListSchema.validate(req.query)
  if (error) {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, 'Missing Keyword')
    return
  }
  // Get the all connected history related to the actor
  var list = getActorConnectedHistory(req.query.actorId)
  var finalOutput =
    list && list > 0
      ? `${list} actors tangentially connected to ${getActorNameById(
        req.query.actorId
      )} are loaded`
      : 'No actors tangentially connected found.'
  utils.successHandler(res, StatusCodes.OK, next, finalOutput)
}

/*
  GET DEGREES AND MOVIES LIST
  - This findActorBasedDegree is responsible to the degree between Kavin Bacon with other actor 
  - Required Field - Actor Name is required
  - We have 4-5 types of degree.
    * -1 -> if actor is unknown or not found
    * 0 ->  if Kavin Bacon directly worked with actor 
    * 1 ->  if the actor worked with someone that worked with Kevin Bacon directly. List the movie history and actor connections.
    * 2 ->  if the actor worked with someone who worked with someone that worked with Kevin Bacon also display movies connections.
*/
const findActorBasedDegree = (req, res, next) => {
  const { error } = degreeSchema.validate(req.query)
  if (error) {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, 'Missing Keyword')
    return
  }
  const KevinBaconId = 'nm0000102' // added static id of Kevin Bacon to find the degrees
  utils.successHandler(
    res,
    StatusCodes.OK,
    next,
    checkDegreeAway(req.query.actorName, KevinBaconId)
  )
}
module.exports = {
  getAllActors,
  getActorHistory,
  findActorBasedDegree,
}
