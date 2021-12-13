import { responseMessage } from './../constants/message.constant';
import { FastifyReply, FastifyRequest } from 'fastify';
import authService from '../services/auth.service';
import userService from '../services/users.service';
import { CreateUserReqBodyInterface } from '../constants/user.constant'

const authControllerResponse = responseMessage.authControllerResponse;

const signIn = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const params: { email: string, password: string; } = req.body as any;
        const data: any = await authService.signIn({
            email: params.email, passoword: params.password
        });
        void reply.send({
            message: authControllerResponse.loginSuccess,
            data,
        });
    } catch (error: any) {
        reply.internalServerError(error.message);
    }
}

const signUp = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const details = req.body as CreateUserReqBodyInterface;
        const getExistingUser = await userService.findUserByFilter({ email: details.email })
        if (getExistingUser) {
            throw new Error(authControllerResponse.userExistError)
        }
        const data = await authService.signUp(details);
        void reply.send({
            message: authControllerResponse.signUpSuccess,
            data,
        });
    } catch (err) {
        void reply.internalServerError(err);
    }
}

export default {
    signIn,
    signUp
};
