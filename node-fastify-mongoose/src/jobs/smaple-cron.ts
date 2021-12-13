import moment from 'moment';
import { CronJob } from 'cron';

import { CronConfigModel, CronStatusModel } from '../models'
import config from '../config';
import { isValidCronExpression } from './utils';

const timeZone = 'Asia/Kolkata';
// store reference of cron job
let cronJob: CronJob;

/**
 * To setup and start cron, called upon server start
 * @export
 * @return {Promise<void>}
 */
export async function setupCronJob(): Promise<void> {
    if (!config.START_CRON) {
        return;
    }
    try {
        // find cron pattern
        const cronConfig = await CronConfigModel.findOne({ key: 'sample_cron' }).lean();
        if (!cronConfig?.value || !isValidCronExpression(cronConfig.value)) {
            let reason = `Cron pattern not found, Please check this key Sample-Cron in config table of database`;
            if (cronConfig?.value) {
                reason = `Given cron pattern "${cronConfig.value}" is invalid, please check and update cron pattern.`;
            }
            await CronStatusModel.create({
                name: 'TEST-CRON',
                startTime: new Date(),
                endTime: new Date(),
                status: 'FAILED',
                reason,
            });
            return;
        }
        cronJob = new CronJob({
            onTick: onCronTick,
            cronTime: cronConfig.value,
            start: true,
            timeZone,
        });
    } catch (error) {
        console.error('Erorr in setting CRON for assets', error);
    }
}

/**
 * Called on defined cron time in cron job
 * @return {Promise<void>}
 */
async function onCronTick(): Promise<void> {
    let cronStatus: any;
    try {
        // create cron entry in database
        cronStatus = await CronStatusModel.create({
            name: 'TEST-CRON',
            startTime: new Date(),
            endTime: new Date(),
            status: 'START',
        });
    } catch (error) {
        console.error(`Error in running cron at ${moment().format('DD-MM-YY')}`, error);
        return;
    }
    /**
     * TODO
     * Implement cron job operation like Insert, Update into database
     */
    await CronStatusModel.updateOne({ _id: cronStatus._id }, {
        status: 'END',
        endTime: new Date()
    });

}
