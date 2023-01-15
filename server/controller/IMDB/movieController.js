const getMovieSchema = require('../../schema/get-movies-schema')
const { StatusCodes } = require('http-status-codes')
const utils = require('../../utils/utils')
const apiServices = require('../../utils/services')
const {
  getActorIdByName,
  saveActorMoviesList,
  getMoviesListByActorId,
  saveMovies,
} = require('../../utils/helperFunctions')

/*
  GET MOVIES LIST
  - This getMoviesByActorName is responsible to get the list of movies 
  - Required Field - Actor Name is required
*/
const getMoviesByActorName = async (req, res, next) => {
  
  //Validate the schema based on actor name
  const { error } = getMovieSchema.validate(req.query)
  if (error) {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, 'Missing Keyword')
    return
  }

  // Get actor details from local
  var id = getActorIdByName(req.query.actorName)
  if (!id) {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, `No Actor Found with Name ${req.query.actorName}`)
    return
  }

  // Call IMDB api to get the list of all movies related particular actor
  var serverResponse = await apiServices.getMoviesByActorIdIMDB(id)
  if (serverResponse) {
    saveActorMoviesList(serverResponse) //Save the list of movies in local
    utils.successHandler(res, StatusCodes.OK, next, 'Movies List has been saved')

    // await getMovieDetails(res, id, next) //Call api funtion to get details of each movie 
  } else {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, 'IMDB Server API Error')
  }
}

/*
  GET MOVIES DETAILS
  - This getMovieDetails is responsible to get the details of movie
  - Required Field - Actor Id is required
*/
const getMovieDetailsByActorName = async (req, res, next) => {
  //Validate the schema based on actor name
  const { error } = getMovieSchema.validate(req.query)
  if (error) {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, 'Missing Keyword')
    return
  }
  // Get actor details from local
  var id = getActorIdByName(req.query.actorName)
  if (!id) {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, `No Actor Found with Name ${req.query.actorName}`)
    return
  }

  const movieList = getMoviesListByActorId(id)
  var resArr = []
  if (movieList && movieList.length > 0) {    
    for (let index = 0; index < movieList.length; index++) {
      // Call IMDB api to get the details of each movie. Limit has been saved in env. 
      const element = movieList[index]
      var serverResponse = await apiServices.getMovieDetailsIMDB(element)
      if (serverResponse) {
        resArr.push(serverResponse)
      }else{
        console.log('IMDB API crashing')
      }
    }
    saveMovies(resArr)
    utils.successHandler(res, StatusCodes.OK, next, 'Movies Details has been saved')
  } else {
    utils.errorHandler(res, StatusCodes.BAD_REQUEST, next, `No movie exists associated with actor ID ${id}`
    )
  }
}

module.exports = {
  getMoviesByActorName,
  getMovieDetailsByActorName
}
