import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { verifyToken } from '../utils/helper';

const prisma = new PrismaClient();

export default async function validator(
    req: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction,
): Promise<any> {
    const accessToken: string | null = req.headers['access-token'] as string;
    if (!accessToken) {
        reply.unauthorized('Missing access-token');
        done();
    } else {
        try {

            const decoded: any = await verifyToken(accessToken)
            if (decoded && decoded.email) {
                const userDetails = prisma.user.findFirst({ where: { email: decoded.email }})
                if (!userDetails) {
                    reply.unauthorized('Not Authorized');
                    done();
                }
                req.user = userDetails as any
                done()
            } else {
                reply.unauthorized('Not Authorized');
                done();
            }

        } catch (err) {
            reply.unauthorized();
            done();
        }
    }
}

export const authorizeUser = {
    preValidation: (
        req: FastifyRequest,
        reply: FastifyReply,
        done: HookHandlerDoneFunction
    ): any => {
        void validator(req, reply, done);
    },
};
