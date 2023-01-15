const Joi = require('joi')

module.exports = Joi.object({
    keyword: Joi.string().required().max(50)
})