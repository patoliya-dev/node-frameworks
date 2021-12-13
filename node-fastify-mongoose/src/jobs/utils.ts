import moment from 'moment';
import { CronTime } from 'cron';
import { CronStatusModel } from '../models'
/**
 * To set status of cron in DB as failed
 * @param {string} id cron status id
 * @param {Error} error reason
 * @param {string} location location from where this happen
 */
 export async function updateFailedStatusInDb(id: string, error: Error, location: string): Promise<void> {
    try {
        await CronStatusModel.findOneAndUpdate({cron_id: id }, {
            status: 'Failed', reason: error.toString(), endTime: new Date()
        });
    } catch (error) {
        console.error(`Error in setting reject status of cron at ${moment().format('DD-MM-YY')} ${location}`, error);
    }
}

/**
 * To check given cron expression is valid or not
 * @param {string} expression
 * @return {boolean}
 */
export function isValidCronExpression(expression: string): boolean {
    if (!expression) {
        return false;
    }
    try {
        new CronTime(expression);
        return true;
    } catch (error) {
        return false;
    }
}