const getActorSchema = require('../../schema/get-actor-schema')
const { StatusCodes } = require('http-status-codes')
const utils = require('../../utils/utils')
const apiServices = require('../../utils/services')
const { saveActorBio } = require('../../utils/helperFunctions')

/*
  GET ACTOR DETAILS
  - This controller is responsible to get the details of Actor 
  - Required Field - Keyword is required
*/
const getActorDetails = async (req, res, next) => {

  // Validate the schema based on query params
  const { error } = getActorSchema.validate(req.query)
  if (error) {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, 'Missing Keyword')
    return
  }

  // Call IMDB based api to get the detials of Actor based on keyword pass by user
  var serverResponse = await apiServices.getActorBioFromIMDB(req.query.keyword)
  if (serverResponse) {
    saveActorBio(serverResponse) // Save actor details locally as a json
    utils.successHandler(res, StatusCodes.OK, next, serverResponse)
  } else {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, 'IMDB Server API Error')
  }
}

module.exports = {
  getActorDetails,
}
