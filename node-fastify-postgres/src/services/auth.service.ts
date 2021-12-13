import { PrismaClient, Prisma } from '@prisma/client';
import { getToken, encrypt } from '../utils/helper';
import { CreateUserReqBodyInterface } from '../constants/user.constant';

const prisma = new PrismaClient();

const signIn = async (body: { email: string, passoword: string }): Promise<{ id: string, token: string }> => {
    const user = await prisma.user.findFirst({ where: { email: body.email, password: encrypt(body.passoword) } });
    if (!user) { throw new Error('User email or password is invalid'); }
    const token: string = getToken({ email: body.email })
    return { id: user.id, token };
};

const signUp = async (body: CreateUserReqBodyInterface): Promise<any> => {
    const password = encrypt(body.password)
    const createdUserDetails: Prisma.UserCreateInput = {
        name: body.name,
        email: body.email,
        password,
    };
    const createdUser: any = await prisma.user.create({ data: createdUserDetails });
    return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
    };
};

export default { signIn, signUp };
