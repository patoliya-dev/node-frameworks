
import { FastifyReply, FastifyRequest } from 'fastify';

import { responseMessage } from '../constants/message.constant';
import userService from '../services/users.service';

const authControllerResponse = responseMessage.authControllerResponse;

const getUserByFilter = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const params = req.params as { id: string };
        const data = await userService.getOneUserByFilter({ _id: params.id });
        if (!data) {
            throw new Error(authControllerResponse.userNotExistException);
        }
        void reply.send({ message: authControllerResponse.getUserSuccess, data });
    } catch (error: any) {
        reply.internalServerError(error);
    }
}

const updateUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const params = req.params as { id: string };
        const body = req.body as { name?: string, email?: string, password?: string }
        const data = await userService.getOneUserByFilter({ _id: params.id });
        if (!data) {
            throw new Error(authControllerResponse.userNotExistException);
        }
        console.log('data-data-data', body)
        await userService.updateUser(data._id, body)
        void reply.send({ message: authControllerResponse.userUpdatedSuccess });
    } catch (error: any) {
        reply.internalServerError(error);
    }
}

const deleteUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const params = req.params as { id: string };
        const data = await userService.getOneUserByFilter({ _id: params.id });
        if (!data) {
            throw new Error(authControllerResponse.userNotExistException);
        }
        await userService.deleteUser(params.id)
        void reply.send({ message: authControllerResponse.userDeleteSuccess });
    } catch (error: any) {
        reply.internalServerError(error);
    }
}

export default {
    getUserByFilter,
    updateUser,
    deleteUser
};
