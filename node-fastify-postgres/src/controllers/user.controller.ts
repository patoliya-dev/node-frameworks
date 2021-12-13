import { responseMessage } from '../constants/message.constant';
import { FastifyReply, FastifyRequest } from 'fastify';
import userService from '../services/users.service';
import { UpdateUserReqBodyInterface } from '../constants/user.constant'

const authControllerResponse = responseMessage.authControllerResponse;
const updateUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const details = req.body as UpdateUserReqBodyInterface;
        const user = req.user;
        const getExistingUser = await userService.findUserByFilter({ email: user.email })
        if (!getExistingUser) {
            throw new Error(authControllerResponse.getUserFailure)
        }
        const updatedUser = await userService.updateUser(
            getExistingUser.id,
            details,  
        );
        void reply.send({
            message: authControllerResponse.userUpdateSuccess,
            data: updatedUser,
        });
    } catch (err) {
        void reply.internalServerError(err);
    }
}

const getUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const params = req.params as any;
        const userDetails = await userService.findUserByFilter({ id: params.id });
        void reply.send({
            message: authControllerResponse.fetchUserSuccess,
            data: userDetails
        });
    } catch (err) {
        void reply.internalServerError(err);
    }
}

const deleteUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const params = req.params as any;
        await userService.deleteUser(params.id as string);
        void reply.send({
            message: authControllerResponse.userdeleteSuccess,
        });
    } catch (err) {
        void reply.internalServerError(err);
    }
}

export default {
    updateUser,
    deleteUser,
    getUser,
};
