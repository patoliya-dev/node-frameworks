import { FastifySchema } from 'fastify';

export const createUserSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                format: 'email',
            },
            password: {
                type: 'string',
            },
        },
        required: ['email', 'password'],
    },
};
