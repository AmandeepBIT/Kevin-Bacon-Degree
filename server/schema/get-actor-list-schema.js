const Joi = require('joi')

module.exports = Joi.object({
    actorId: Joi.string().required().max(50),
})