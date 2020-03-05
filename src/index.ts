import { Application } from './application';
import dotenv from 'dotenv';

dotenv.config();

setImmediate(async () => {
  const application = new Application({
    port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000,
    mongoPassword: process.env.MONGO_PASSWORD || 'admin',
    mongoUser: process.env.MONGO_USER || 'admin',
  });

  console.log('Starting application');
  await application.start();
});
