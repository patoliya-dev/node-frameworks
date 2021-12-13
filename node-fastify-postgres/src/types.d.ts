import { User } from '@prisma/client';
import fastify from 'fastify';

declare module 'fastify' {
    export interface FastifyRequest {
        user: User & { session_id: string };
    }
}
