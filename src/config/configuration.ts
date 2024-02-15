export default () => ({
  corsOrigin: ['http://localhost:3000'],
  database: {
    host: process.env.TYPEORM_HOST,
    user: process.env.TYPEORM_USERNAME || 'postgres',
    name: process.env.TYPEORM_DATABASE,
    password: process.env.TYPEORM_PASSWORD,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
  },
  coinstats: {
    url: process.env.COINSTATS_URL,
    apiKey: process.env.COINSTATS_API_KEY,
  },
});
