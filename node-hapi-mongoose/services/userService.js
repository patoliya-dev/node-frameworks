const user = require('../models/userModel');

const createUser = async (userData) => {
    try{
     const findUserData = await user.create(userData);
     return findUserData;
    } catch(e) {
     throw new Error(e.message);
    }
 };

 const findUser = async () => {
    try{
     const findUserData = await user.find();
     return findUserData;
    } catch(e) {
     throw new Error(e.message);
    }
 };

 const findByIdUser = async (userId) => {
    try{
     const findByIdUserData = await user.findById(userId);
     if(!findByIdUserData) throw new Error('User Not exist!');
     return findByIdUserData;
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
    createUser,
    findUser,
    findByIdUser,
    removeUser,
    updateUser
};