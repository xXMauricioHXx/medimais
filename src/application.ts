import { HttpServer } from "./http";

export interface  ApplicationConfig {
    port: number;
}

export class Application {
    constructor(private readonly config: ApplicationConfig) {}
    async start() {
        const httpServer = new HttpServer({
            port: this.config.port,
        });
        console.log('Initializing Http Server');
        await httpServer.start();
    }
}