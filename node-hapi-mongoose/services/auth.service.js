const { encrypt } = require('../utils/helper')
const user = require('../models/user.model');

const createUser = async (userData) => {
   try {
      userData.password = encrypt(userData.password)
      const userData = await user.create(userData);
      return true;
   } catch (e) {
      throw new Error(e.message);
   }
};

module.exports = {
   createUser
};