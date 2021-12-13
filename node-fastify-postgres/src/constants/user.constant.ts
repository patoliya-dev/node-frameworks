export interface CreateUserReqBodyInterface {
    name: string;
    email: string;
    password: string;
}

export interface CreateUserResBodyInterface {
    id: string,
    name: string;
    email: string;
    password?: string;
}

export interface GetUserResInterface {
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
}

export interface UpdateUserReqBodyInterface {
    name?: string;
    email?: string;
    password?: string;
}