import mongoose, {Schema} from 'mongoose'

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export type createWaitlistUserType = {
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export type getWaitlistUserType = {
    _id?: string,
    email?: string,
    name?: string,
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export const UserSchema = new Schema({
    name: {type: String, required: true },
    email: {type: String, index: true, required: true, validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
    password: {type: String, required: true },
    createdAt: {
        type: Date, default: () => {
            return new Date()
        },
    },
    updatedAt: {type: Date},
}, {strict: 'throw'})

export const UserModel = mongoose.model<IUser>('user', UserSchema)
