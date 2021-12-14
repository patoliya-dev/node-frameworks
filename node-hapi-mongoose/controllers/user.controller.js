const userService = require('../services/user.service');
const Boom = require('@hapi/boom');

const getUser = async (request, h) => {
    try {
        const User = await userService.findUser();
        return User;
      } catch (e) {
        return Boom.badData(e.message);
      }
};

const getSingleUser = async (request, h) => {
    try {
        const userId = request.params.userId;
        const User = await userService.findByIdUser(userId);
        return User;
      } catch (e) {
        return Boom.badData(e.message);
      }
};

const deleteUser = async (request, h) => {
    try {
        const userId = request.params.userId;
        const User = await userService.removeUser(userId);
        return {data:User,message: 'User has been Deleted!'};
      } catch (e) {
        return Boom.badData(e.message);
      }
};

const editUser = async (request, h) => {
    try {
        const userId = request.params.userId;
        const User = await userService.updateUser(userId,request.payload);
        return {message: 'User has been Updated!'};
      } catch (e) {
        return Boom.badData(e.message);
      }
};

module.exports = {
    getUser,
    getSingleUser,
    deleteUser,
    editUser
};