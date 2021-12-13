interface IConfig {
    NODE_ENV: string;
    DATABASE_URL: string;
    CRON: {
        START_CRON: boolean;
    };
}

const config: IConfig = {
    NODE_ENV: process.env.NODE_ENV as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    CRON: {
        START_CRON: process.env.START_CRON === 'true',
    },
};

export default config;
