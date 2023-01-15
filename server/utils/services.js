const axios = require('axios')

// Get the actor details from IMDB based on keyword
const getActorBioFromIMDB = async (keyword) => {
  const options = {
    method: 'GET',
    url: `${process.env.ONLINE_MOVIE_BASEURL}auto-complete`,
    params: { q: keyword },
    headers: {
      'X-RapidAPI-Key': process.env.ONLINE_MOVIE_API_KEY,
      'X-RapidAPI-Host': process.env.ONLINE_MOVIE_API_HOST,
    },
  }
  return await getServerResponse(options)
}

// Get the list of all movies related to the actor IMDB based
const getMoviesByActorIdIMDB = async (actorId) => {
  const options = {
    method: 'GET',
    url: `${process.env.MOVIE_DETAILS_BASEURL}actor`,
    params: { id: actorId },
    headers: {
      'X-RapidAPI-Key': process.env.ONLINE_MOVIE_API_KEY,
      'X-RapidAPI-Host': process.env.MOVIE_DETAILS_API_HOST,
    },
  }
  return await getServerResponse(options)
}

// Get the Detials of movie IMDB based
const getMovieDetailsIMDB = async (movieId) => {
  const options = {
    method: 'GET',
    url: `${process.env.MOVIE_DETAILS_BASEURL}movie`,
    params: { id: movieId },
    headers: {
      'X-RapidAPI-Key': process.env.ONLINE_MOVIE_API_KEY,
      'X-RapidAPI-Host': process.env.MOVIE_DETAILS_API_HOST,
    },
  }
  return await getServerResponse(options)
}

// Handle the api as a generic way for Get method
async function getServerResponse(options) {
  return await axios
    .request(options)
    .then(function (response) {
      return response && response.data ? response.data : undefined
    })
    .catch(function () {
      return undefined
    })
}

module.exports = {
  getActorBioFromIMDB,
  getMoviesByActorIdIMDB,
  getMovieDetailsIMDB,
}
