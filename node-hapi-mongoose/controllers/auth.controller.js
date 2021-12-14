const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const { encrypt, getToken } = require('../utils/helper')

const Boom = require('@hapi/boom');

const signUp = async (request, h) => {
  try {
    const user = await authService.createUser(request.payload);
    return { message: 'User has been registerd successfully' };
  } catch (e) {
    return Boom.badData(e.message);
  }
};

const signIn = async (request, h) => {
  try {
    const { email, password } = request.payload
    const user = await userService.findUserByFilter({ email: email, password: encrypt(password) });
    if (!user) throw new Error('User not found')
    const token = getToken({ email: user.email })
    return { message: 'User has been logged in successfully', data: { id: user._id, email: user.email, token } };
  } catch (e) {
    return Boom.badData(e.message);
  }
};

module.exports = {
  signUp,
  signIn
};