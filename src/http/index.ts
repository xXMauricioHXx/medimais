import express from 'express';
import mongoose from 'mongoose';
import { MedicineController } from './controller/medine';
import { Controller } from './controller/controller';
import { NotFoundError } from '../errors';
import { handleError } from './middlewares/error-handle';

export interface HttpServerConfig {
  port: number;
  mongoUser: string;
  mongoPassword: string;
}

export class HttpServer {
  constructor(private readonly config: HttpServerConfig) {}

  private loadControllers(): Controller[] {
    return [new MedicineController()];
  }

  connectDB() {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      `mongodb+srv://${this.config.mongoUser}:${this.config.mongoPassword}@products-ogm9w.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  start() {
    const app = express();
    const router = express.Router({ mergeParams: true });
    this.loadControllers().forEach((controller: Controller) =>
      controller.loadRoutes(router)
    );

    app.use(router);
    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new NotFoundError());
      }
    );

    app.use(handleError);
    app.listen(this.config.port, () =>
      console.log(`Server running on http://localhost:${this.config.port}`)
    );
  }
}
