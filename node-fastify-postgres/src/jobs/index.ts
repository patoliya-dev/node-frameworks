import { FastifyInstance } from 'fastify';

import { setupCronJob } from './smaple-cron';

export function registerCrons(fastify: FastifyInstance): void {
    void setupCronJob();
}
