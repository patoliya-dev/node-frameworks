import mongoose from 'mongoose'

import config from '../config'
import { UserModel } from './user.model'
import { CronConfigModel } from './cronConfig.model'
import { CronStatusModel } from './cronStatus.model'

const NODE_ENV = config.NODE_ENV

mongoose.Promise = global.Promise

// Dont connect to real db when running test configuration
if (NODE_ENV !== 'test') {
  mongoose
    .connect(config.DATABASE_URL)
    .then(async () => console.log('DB connected successfully'))
    .catch((err: any) => console.log('Error while connecting DB', err))
}

export {
  mongoose,
  UserModel,
  CronConfigModel,
  CronStatusModel
}
