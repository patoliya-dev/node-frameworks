interface IConfig {
    NODE_ENV: string;
    DATABASE_URL: string,
    START_CRON: boolean
}

const config: IConfig = {
    NODE_ENV: process.env.NODE_ENV as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    START_CRON: process.env.START_CRON as any,
};

export default config;
