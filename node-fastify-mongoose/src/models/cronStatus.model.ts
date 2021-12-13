import mongoose, { Schema } from 'mongoose'

export interface ICronStatus extends mongoose.Document {
    name: string,
    status: string,
    reason: string,
    startTime: Date,
    endTime: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

export const CronStatusSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    reason: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    createdAt: {
        type: Date, default: () => {
            return new Date()
        },
    },
    updatedAt: { type: Date },
}, { strict: 'throw' })

export const CronStatusModel = mongoose.model<ICronStatus>('cronStatus', CronStatusSchema)
