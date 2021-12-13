const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/user',
    handler: userController.addUser,
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
