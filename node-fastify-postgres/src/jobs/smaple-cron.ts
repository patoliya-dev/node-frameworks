import { PrismaClient, CronStatus } from '@prisma/client';
import moment from 'moment';
import { CronJob, CronTime } from 'cron';

import config from '../config';
import { isValidCronExpression } from './utils';

const prisma = new PrismaClient();

const timeZone = 'Asia/Kolkata';
// store reference of cron job
let cronJob: CronJob;

/**
 * To setup and start cron, called upon server start
 * @export
 * @return {Promise<void>}
 */
export async function setupCronJob(): Promise<void> {
    if (!config.CRON.START_CRON) {
        return;
    }
    try {
        // find cron pattern
        const cronConfig = await prisma.config.findUnique({ where: { key: 'sample_cron' }, select: { value: true, key: true } });
        if (!cronConfig?.value || !isValidCronExpression(cronConfig.value)) {
            let reason = `Cron pattern not found, Please check this key Sample-Cron in config table of database`;
            if (cronConfig?.value) {
                reason = `Given cron pattern "${cronConfig.value}" is invalid, please check and update cron pattern.`;
            }
            await prisma.cronStatus.create({
                data: {
                    name: 'Failed to start CRON job on server start',
                    start_time: new Date(),
                    end_time: new Date(),
                    status: 'FAILED',
                    reason,
                },
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
    let cronStatus: CronStatus;
    try {
        // create cron entry in database
        cronStatus = await prisma.cronStatus.create({
            data: {
                name: 'TEST-CRON',
                start_time: new Date(),
                end_time: new Date(),
                status: 'START',
            },
        });
    } catch (error) {
        console.error(`Error in running cron at ${moment().format('DD-MM-YY')}`, error);
        return;
    }
    /**
     * TODO
     * Implement cron job operation like Insert, Update into database
     */
    await prisma.cronStatus.update({
        where: { id: cronStatus.id },
        data: {
            status: 'END',
            end_time: new Date()
        },
    });
    
}
