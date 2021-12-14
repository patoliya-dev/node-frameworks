const user = require('../models/user.model');

 const findUser = async () => {
    try{
     const findUserData = await user.find();
     return findUserData;
    } catch(e) {
     throw new Error(e.message);
    }
 };

 const findUserByFilter = async (filter) => {
    try{
     const userDetails = await user.findOne(filter);
     if(!userDetails) throw new Error('User Not exist!');
     return userDetails;
    } catch(e) {
     throw new Error(e.message);
    }
 };

 const removeUser = async (userId) => {
    try{
     const removeUserData = await user.findByIdAndRemove(userId);
     if(!removeUserData) throw new Error('User Not exist!');
     return removeUserData;
    } catch(e) {
     throw new Error(e.message);
    }
 };

 const updateUser = async (userId,userData) => {
    try{
     const updateUserData = await user.findByIdAndUpdate(userId,userData);
     if(!updateUserData) throw new Error('User Not exist!');
     return updateUserData;
    } catch(e) {
     throw new Error(e.message);
    }
 };

module.exports = {
    findUser,
    findUserByFilter,
    removeUser,
    updateUser
};