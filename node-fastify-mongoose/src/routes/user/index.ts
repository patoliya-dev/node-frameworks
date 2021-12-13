import { FastifyPluginAsync } from 'fastify';

import userController from '../../controllers/users.controller';
import { authorizeUser } from '../../middleware/user-pssport';

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:id', authorizeUser, userController.getUserByFilter);
    fastify.put('/:id', authorizeUser, userController.updateUser);
    fastify.delete('/:id', authorizeUser, userController.deleteUser);
};

export default user;
