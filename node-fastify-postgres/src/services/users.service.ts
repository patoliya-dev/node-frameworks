import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import { UpdateUserReqBodyInterface, GetUserResInterface } from '../constants/user.constant';

const prisma = new PrismaClient();

const generateUser = (user: { id: string, name: string, email: string, created_at: Date, updated_at: Date }): GetUserResInterface => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    };
};

const updateUser = async (id: string, userDetailsToUpdate: UpdateUserReqBodyInterface): Promise<GetUserResInterface> => {
    const updatedUser: any = await prisma.user.update({ where: { id }, data: userDetailsToUpdate });
    return generateUser(updatedUser);
};

const deleteUser = async (id: string): Promise<void> => {
    await prisma.user.delete({ where: { id } });
};

const findUserByFilter = async (where: any) => {
    const userDetails: any = await prisma.user.findFirst({ where: { email: where.email } })
    if (!userDetails) return null
    return generateUser(userDetails);
}

const getUser = async (user: { id: string, name: string, email: string, created_at: Date, updated_at: Date }): Promise<GetUserResInterface> => {
    return generateUser(user);
};

export default {
    updateUser,
    deleteUser,
    getUser,
    findUserByFilter
};
