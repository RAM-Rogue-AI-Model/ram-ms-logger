interface configType {
  PORT: number;
  DATABASE_URL: string;
  DATABASE_PORT: number;
  DATABASE_HOST: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_DB_NAME: string;
  INTERNAL_SECRET: string;
}

export { configType };
