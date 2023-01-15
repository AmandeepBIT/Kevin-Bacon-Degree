/* eslint-disable no-undef */
const { expect } = require('chai')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../../index')
chai.should()
chai.use(chaiHttp)

const helperFunctions = require('../utils/helperFunctions')
const actorMoviesListJson = require('../assets/json/actorMoviesList.json')

// HELPER FUNCTIONS TEST CASES
describe('test case for saveActorMoviesList', () => {
    it('saveActorMoviesList if data', () => {
        expect(helperFunctions.saveActorMoviesList(actorMoviesListJson)).to.equal(true)
    })
    it('saveActorMoviesList if not data', () => {
        expect(helperFunctions.saveActorMoviesList(null)).to.equal(false)
    })
})

describe('test case for getActorIdByName', () => {
    it('getActorIdByName if exists', () => {
        expect(helperFunctions.getActorIdByName('Kevin Bacon')).to.equal('nm0000102')
    })
    it('getActorIdByName if not exists', () => {
        expect(helperFunctions.getActorIdByName('Kevin Bacon 55')).to.equal(undefined)
    })
})

describe('test case for getActorNameById', () => {
    it('getActorNameById if exists', () => {
        expect(helperFunctions.getActorNameById('nm0000102')).to.equal('Kevin Bacon')
    })
    it('getActorNameById if not exists', () => {
        expect(helperFunctions.getActorNameById('nm0000102 55')).to.equal(undefined)
    })
})

describe('test case for getMoviesListByActorId', () => {
    it('getMoviesListByActorId if exists', () => {
        expect(helperFunctions.getMoviesListByActorId('nm0000102')).to.be.an('array')
    })

    it('getMoviesListByActorId if not exists', () => {
        expect(helperFunctions.getMoviesListByActorId('nm00001025')).to.equal(undefined)
    })
})

describe('test case for getActorList', () => {
    it('getActorList', () => {
        expect(helperFunctions.getActorList()).to.be.an('array')
    })
})

describe('test case for getActorConnectedHistory', () => {
    it('getActorConnectedHistory if worked with other', () => {
        expect(helperFunctions.getActorConnectedHistory('nm0000102')).to.be.above(0)
    })

    it('getActorConnectedHistory if not worked with other', () => {
        expect(helperFunctions.getActorConnectedHistory('nm1708557')).to.be.equal(0)
    })
})

describe('test case for checkDegreeAway', () => {
    it('checkDegreeAway if worked with 3', () => {
        const result = helperFunctions.checkDegreeAway('Elijah Woods', 'nm0000102')
        expect(result.Degree).to.be.equal(3)
        expect(result['Movie History'].length).to.be.equal(4)
    })

    it('checkDegreeAway if worked with 0', () => {
        const result = helperFunctions.checkDegreeAway('Elijah Wood', 'nm0000102')
        expect(result.Degree).to.be.equal(0)
        expect(result['Movie History'].length).to.be.equal(1)
    })

    it('checkDegreeAway if not worked with anyone', () => {
        const result = helperFunctions.checkDegreeAway('Elijah Woods 55', 'nm0000102')
        expect(result.degree).to.be.equal('-1')
        expect(result.movieHistory).to.be.equal('No movie history')
    })
})

// API TEST CASES
describe('Test Cases Get All Actors List API', () => {
    it('Test Get All Actors List API ', (done) => {
        chai.request(server)
            .get('/api/local/actor-list')
            .end((err, Response) => {
                if (err) {
                    console.log('Error during Get All Actors List', err)
                }
                expect(Response.status).to.be.equal(200)
                done()
            })
    })
})

describe('Test Cases Get Actor History', () => {
    it('Get Actor History', (done) => {
        chai.request(server)
            .get('/api/local/actor-history?actorId=nm0000102')
            .end((err, Response) => {
                if (err) {
                    console.log('Error during Get Actor Degree', err)
                }
                expect(Response.status).to.be.equal(200)
                done()
            })
    })

    it('Get Actor History if Actor Name is missing', (done) => {
        chai.request(server)
            .get('/api/local/getActorHistory')
            .end((err, Response) => {
                if (err) {
                    console.log('Error during Get Actor Degree', err)
                }
                expect(Response.status).to.be.equal(404)
                done()
            })
    })
})

describe('Test Cases Get Actor Degree', () => {
    it('Get degree', (done) => {
        chai.request(server)
            .get('/api/local/degree-away?actorName=Elijah Woods44')
            .end((err, Response) => {
                if (err) {
                    expect(Response.status).to.be.equal(500)
                    done()
                }
                expect(Response.status).to.be.equal(200)
                done()
            })
    })

    it('Get degree if actor Name is missing', (done) => {
        chai.request(server)
            .get('/api/local/degree-away')
            .end((err, Response) => {
                if (err) {
                    expect(Response.status).to.be.equal(500)
                    done()
                }
                expect(Response.status).to.be.equal(400)
                done()
            })
    })
})
