import { FastifyPluginAsync } from 'fastify';
import authController from '../../controllers/auth.controller';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/signIn', authController.signIn);
    fastify.post('/signUp', authController.signUp);
};

export default auth;
