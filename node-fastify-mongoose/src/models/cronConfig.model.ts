import mongoose, { Schema } from 'mongoose'

export interface ICronConfig extends mongoose.Document {
    key: string,
    value: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export const CronConfigSchema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    createdAt: {
        type: Date, default: () => {
            return new Date()
        },
    },
    updatedAt: { type: Date },
}, { strict: 'throw' })

export const CronConfigModel = mongoose.model<ICronConfig>('cronConfig', CronConfigSchema)
