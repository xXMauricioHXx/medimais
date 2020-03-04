import express, { Router } from 'express';
import { MedicineController } from './controller/medine';
import { Controller } from './controller/controller';

export interface HttpServerConfig {
    port: number;
}

export class HttpServer {
    constructor(private readonly config: HttpServerConfig) {}
    
    private loadControllers(): Controller[] {
        return [
            new MedicineController()
        ];
    }

    start() {
        const app = express();
        const router = express.Router({mergeParams: true});        
        this.loadControllers().forEach((controller: Controller) => controller.loadRoutes(router));

        app.use(router);
        app.listen(this.config.port, () => console.log(`Server running on http://localhost:${this.config.port}`));
    }
}