import { FastifyPluginAsync } from 'fastify';

import authController from '../../controllers/auth.controller';
import { loginUserSchema } from '../../validationSchemas/users';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/signUp', { schema: loginUserSchema }, authController.signUp);
    fastify.post('/signIn', { schema: loginUserSchema }, authController.signIn);
};

export default auth;
