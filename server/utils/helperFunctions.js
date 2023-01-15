const fs = require('fs')
const path = require('path')

// Kind of interface to handle the degrees
const degrees = {
  Negative: '-1',
  Zero: '0',
  One: '1',
  Two: '2',
}

/**************START**************** Local Json Based File Paths **********************/

const getActorFilePath = () => {
  return path.resolve(__dirname, '../assets/json/actorBio.json')
}
const getActorMoviesFilePath = () => {
  return path.resolve(__dirname, '../assets/json/actorMoviesList.json')
}
const getMoviesFilePath = () => {
  return path.resolve(__dirname, '../assets/json/moviesDetail.json')
}

/**************ENDS**************** Local Json Based File Paths **********************/

/**************START*************** Save Data IN Local Json Files ********************/
// Save Actor information
const saveActorBio = (data) => {
  if (data) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(getActorFilePath(), stringifyData)
  }
}

// Save all the movies related to particular actor
const saveActorMoviesList = (data) => {
  if (data) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(getActorMoviesFilePath(), stringifyData)
    return true
  }
  return false
}

// Save movies details
const saveMovies = (data) => {
  if (data) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(getMoviesFilePath(), stringifyData)
  }
}
/**************ENDS*************** Save Data IN Local Json Files ********************/

// Get actor information based on Name
const getActorIdByName = (name) => {
  const jsonData = fs.readFileSync(getActorFilePath())
  const result = JSON.parse(jsonData)
  if (result && result.d && result.d.length > 0) {
    var arr = result.d
    arr = arr.filter((element) => element.l === name)
    return arr && arr.length > 0 ? arr[0].id : undefined
  }
  return undefined
}

// Get actor information based on Id
const getActorNameById = (id) => {
  const jsonData = fs.readFileSync(getActorFilePath())
  const result = JSON.parse(jsonData)
  if (result && result.d && result.d.length > 0) {
    var arr = result.d
    arr = arr.filter((element) => element.id === id)
    return arr && arr.length > 0 ? arr[0].l : undefined
  }
  return undefined
}

// Get movies related to particular actor
const getMoviesListByActorId = (id) => {
  const jsonData = fs.readFileSync(getActorMoviesFilePath())
  const result = JSON.parse(jsonData)
  if (result && result.id && result.id === id) {
    if (result.movie_ids && result.movie_ids.length > 0) {
      var arr = result.movie_ids.slice(0, process.env.MOVIES_LIMIT || 5)
      return arr
    }
  }
  return undefined
}

// Get the list of all actors
const getActorList = () => {
  const jsonData = fs.readFileSync(getMoviesFilePath())
  const result = JSON.parse(jsonData)
  var actorList = []
  if (result && result.length > 0) {
    result.map((movie) => {
      if (movie.actors && movie.actors.length > 0) {
        movie.actors.map((actor) => {
          actorList.push(actor.name || '')
        })
      }
    })
  }
  return actorList
}

// Get the list of connected actors
const getActorConnectedHistory = (id) => {
  const jsonData = fs.readFileSync(getMoviesFilePath())
  const result = JSON.parse(jsonData)
  var actorCount = 0
  if (result && result.length > 0) {
    result.map((movie) => {
      if (movie.actors && movie.actors.length > 0) {
        const isExists = movie.actors.filter((actor) => actor.id == id)
        if (isExists.length > 0) {
          actorCount = actorCount + movie.actors.length
        }
      }
    })
  }
  return actorCount
}

const checkDegreeAway = (actorName, KevinBeconId) => {
  const jsonData = fs.readFileSync(getMoviesFilePath())
  const result = JSON.parse(jsonData)

  // Check actorName is available in the local file or its unknown
  const isUnknowns = isUnknown(result, actorName)
  if (isUnknowns[0]) {
    return isUnknowns[0]
  }

  // Check actorName degrees calculation as compared with Kevin Bacon
  var arr = [isUnknowns[1]]
  var moviLi = []
  for (let degreeDepth = 0; degreeDepth < 4; degreeDepth++) {
    var deg = calculateDegree(result, degreeDepth, arr, KevinBeconId)
    moviLi.push(getUniqueMovies(deg[1]))
    if (deg[0] > -1) {
      return {
        Degree: deg[0],
        'Movie History': moviLi,
      }
    }
    arr = deg[1]
  }
}

// Check actor is locally available or not
function isUnknown(result, actorName) {
  var actorId = ''
  var isUnknown = true
  if (result && result.length > 0) {
    result.map((movie) => {
      if (movie.actors && movie.actors.length > 0) {
        const isExists = movie.actors.filter(
          (actor) => actor.name == actorName
        )
        isExists.length > 0
          ? ((isUnknown = false), (actorId = isExists[0].id))
          : null
      }
    })
  }
  if (isUnknown == true) {
    return [{
      degree: degrees.Negative,
      message: `${actorName} is a loser and unknown`,
      movieHistory: 'No movie history',
    }, actorId]
  }
  return [undefined, actorId]
}

// Filter the unique values
function getUniqueMovies(data) {
  return [...new Set(data.map((item) => item.movieName))]
}

// Filter the KevinBecon id with linkedActors
function filterDegree(degree, linkedActorList, KevinBeconId) {
  var isDegreeZero = linkedActorList.filter(
    (actor) => actor.id == KevinBeconId
  )
  if (isDegreeZero.length > 0) {
    return degree
  }
  return undefined
}

// Filter the unique values based on Objects
const uniq = (arr, track = new Set()) =>
  arr.filter(({ id }) => (track.has(id) ? false : track.add(id)))

// Check the depth of degree based on actor connections
function calculateDegree(result, degree, actorArray, KevinBeconId) {
  var callback
  var arr = []
  actorArray.some((element) => {
    var id = element && element.id ? element.id : element
    const linkedActorList = getActorArray(result, id)
    var res = filterDegree(degree, linkedActorList, KevinBeconId)
    arr = arr.concat(linkedActorList)
    arr = uniq(arr)
    if (res !== undefined) {
      callback = res
      return true
    }
  })
  return [callback, arr]
}
// Get the list of connected actors based on actor
function getActorArray(result, actorId) {
  var movieActors = []
  result.map((movie) => {
    if (movie.actors && movie.actors.length > 0) {
      var actorExists = movie.actors.filter((actor) => actor.id == actorId)
      if (actorExists.length > 0) {
        movie.actors.forEach((element) => {
          element.movieName = movie.title
          element.movieId = movie.id
        })
        movieActors = movieActors.concat(movie.actors)
      }
    }
  })
  return movieActors
}

module.exports = {
  saveActorBio,
  getActorIdByName,
  saveActorMoviesList,
  getMoviesListByActorId,
  getActorList,
  saveMovies,
  getActorNameById,
  getActorConnectedHistory,
  checkDegreeAway,
}
