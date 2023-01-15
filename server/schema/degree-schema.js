const Joi = require('joi')

module.exports = Joi.object({    
    actorName: Joi.string().required().max(50),
})