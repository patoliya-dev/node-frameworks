import { FastifyReply, FastifyRequest, HookHandlerDoneFunction, RouteShorthandOptions } from 'fastify';

import { verifyToken } from '../utils/utils'
import userService from '../services/users.service'

export default async function validator(req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): Promise<any> {
    const accessToken: string | null = req.headers['x-access-token'] as string;

    if (!accessToken) {
        reply.unauthorized('Missing access token');
        done();
    } else {
        try {
            const details = await verifyToken(accessToken)
            const userDetails = await userService.getOneUserByFilter({ email: details?.email })
            if (!userDetails) {
                throw new Error('User not authorized');
            }
            req.user = userDetails
            done();
        } catch (err) {
            reply.unauthorized();
            done();
        }
    }
}

export const authorizeUser: Pick<RouteShorthandOptions, 'preHandler'> = {
    preHandler: (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void => {
        void validator(req, reply, done);
    },
};
