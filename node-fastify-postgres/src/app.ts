import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import dotenv from 'dotenv';
// @ts-ignore
import fileUpload from 'fastify-file-upload';

import { registerCrons } from './jobs';

export type AppOptions = {
    // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
    const parsed = dotenv.config();

    void fastify.register(require('fastify-cors'));

    void fastify.register(fileUpload);

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts,
    });

    // This loads all plugins defined in routes
    // define your routes in one of these

    void fastify.get('/', (req, reply) => {
        void reply.send('API V1');
    });

    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: Object.assign({ prefix: '/v1/' }, opts),
    });
    
    registerCrons(fastify);
};
export default app;
export { app };
