import { HttpServer } from './http';

export interface ApplicationConfig {
  port: number;
  mongoPassword: string;
  mongoUser: string;
}

export class Application {
  constructor(private readonly config: ApplicationConfig) {}
  async start() {
    const httpServer = new HttpServer({
      port: this.config.port,
      mongoPassword: this.config.mongoPassword,
      mongoUser: this.config.mongoUser,
    });
    console.log('Initializing Http Server');
    await httpServer.start();
  }
}
