import { UserModel } from '../models/user.model';
import { encrypt } from '../utils/utils'

/** Get user by id */
const getOneUserByFilter = async (query: any) => {
    try {
        const result = await UserModel.findOne(query).select('-password').lean();
        return result;
    } catch (e: any) {
        throw new Error(e);
    }
};

/** Create User in database */
const createUser = async (userObj: { name: string, email: string, password: string }) => {
    try {
        const result = await UserModel.create({ name: userObj.name, email: userObj.email, password: encrypt(userObj.password) })
        return result
    } catch (e: any) {
        throw new Error(e)
    }
}

/** Update User in database */
const updateUser = async (id: string, userObj: any) => {
    try {
        if (userObj.password) {
            userObj.password = encrypt(userObj.password)
        }
        await UserModel.findByIdAndUpdate(id, { ...userObj, updatedAt: new Date() }, { new: true });
        return true;
    } catch (e: any) {
        throw new Error(e);
    }
};

/** Delete User in database */
const deleteUser = async (id: string) => {
    try {
        await UserModel.findOneAndDelete({ _id: id });
        return true;
    } catch (e: any) {
        throw new Error(e);
    }
};

export default { getOneUserByFilter, createUser, updateUser, deleteUser };
