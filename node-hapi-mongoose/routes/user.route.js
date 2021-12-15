const userController = require('../controllers/user.controller');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/user',
    config: {
      handler: userController.getUser
    },
  },
  {
    method: 'GET',
    path: '/api/user/{userId}',
    config: {
      handler: userController.getSingleUser,
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/user/{userId}',
    config: {
      handler: userController.deleteUser,
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/user/{userId}',
    config: {
      handler: userController.editUser,
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  }
];
