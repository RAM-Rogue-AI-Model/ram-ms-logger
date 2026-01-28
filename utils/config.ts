import {configType} from "../types/config";

const config: configType = {
    PORT: Number(process.env.PORT) || 3001,
    DATABASE_URL: process.env.DATABASE_URL || 'mysql://localhost:30000/mydatabase',
};

export { config };
