const userService = require('../services/user.service');
const Boom = require('@hapi/boom');
const userPassport = require('../middleware/user-pssport')

const getUser = async (request, h) => {
  try {
    return new Promise((resolve, reject) => {
      userPassport(request, h).then(async () => {
        const user = await userService.findUser();
        resolve(user);
      }).catch(error => reject(error))
    })
  } catch (e) {
    return Boom.badData(e.message);
  }
};

const getSingleUser = async (request, h) => {
  try {
    return new Promise((resolve, reject) => {
      userPassport(request, h).then(async () => {
        const userId = request.params.userId;
        const user = await userService.findUserByFilter({ _id: userId });
        resolve(user);
      }).catch(error => reject(error))
    })
  } catch (e) {
    return Boom.badData(e.message);
  }
};

const deleteUser = async (request, h) => {
  try {
    return new Promise((resolve, reject) => {
      userPassport(request, h).then(async () => {
        const userId = request.params.userId;
        const User = await userService.removeUser(userId);
        resolve({ data: User, message: 'User has been Deleted!' });
      }).catch(error => reject(error))
    })
  } catch (e) {
    return Boom.badData(e.message);
  }
};

const editUser = async (request, h) => {
  try {
    return new Promise((resolve, reject) => {
      userPassport(request, h).then(async () => {
        const userId = request.params.userId;
        await userService.updateUser(userId, request.payload);
        return { message: 'User has been Updated!' };
      }).catch(error => reject(error))
    })
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