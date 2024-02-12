export default () => ({
  database: {
    host: process.env.TYPEORM_HOST,
    user: process.env.TYPEORM_USERNAME || 'postgres',
    name: process.env.TYPEORM_DATABASE,
    password: process.env.TYPEORM_PASSWORD,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
  },
});