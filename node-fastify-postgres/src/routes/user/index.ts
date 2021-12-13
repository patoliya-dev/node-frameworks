import { FastifyPluginAsync } from 'fastify';
import userController from '../../controllers/user.controller';
import { authorizeUser } from '../../middleware/userPassport';

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:id', authorizeUser, userController.getUser);
    fastify.put('/:id', authorizeUser, userController.updateUser);
    fastify.delete('/:id', authorizeUser, userController.deleteUser);
};

export default user;
