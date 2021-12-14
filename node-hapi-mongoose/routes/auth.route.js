const authController = require('../controllers/auth.controller');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/user/signUp',
    handler: authController.signUp,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/api/user/signIn',
    handler: authController.signIn,
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required()
        })
      }
    }
  }
];
