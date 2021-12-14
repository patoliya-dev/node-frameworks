const userController = require('../controllers/user.controller');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/user',
    handler: userController.getUser
  },
  {
    method: 'GET',
    path: '/api/user/{userId}',
    handler: userController.getSingleUser,
    options: {
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
    handler: userController.deleteUser,
    options: {
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
    handler: userController.editUser,
    options: {
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  }
];
