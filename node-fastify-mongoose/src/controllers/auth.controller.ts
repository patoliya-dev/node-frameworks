import { responseMessage } from '../constants/message.constant';
import { FastifyReply, FastifyRequest } from 'fastify';
import userService from '../services/users.service';
import { encrypt, getToken } from '../utils/utils'

const authControllerResponse = responseMessage.authControllerResponse;

const signUp = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const params = req.body as {
            name: string;
            email: string;
            password: string;
        };
        const existingUser = await userService.getOneUserByFilter({ email: params.email })
        if (existingUser) {
            throw new Error(authControllerResponse.userAlreadyExistException);
        }
        await userService.createUser(params)
        void reply.send({ message: authControllerResponse.signUpSuccess });
    } catch (err: any) {
        reply.internalServerError(err);
    }
}

const signIn = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const params = req.body as { email: string; password: string; };
        const userDetails = await userService.getOneUserByFilter({ email: params.email, password: encrypt(params.password) })
        if (!userDetails) {
            throw new Error(authControllerResponse.invalidEmailOrPasswordException);
        }
        const token = getToken({ email: params.email })
        void reply.send({
            message: authControllerResponse.loginSuccess,
            data: { _id: userDetails._id, token },
        });
    } catch (error: any) {
        reply.internalServerError(error);
    }
}

export default {
    signUp,
    signIn
};
