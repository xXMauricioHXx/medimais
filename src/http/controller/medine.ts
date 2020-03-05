import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { validatorMiddleware } from '../middlewares/validators';
import { listMedicines } from '../schema/medicine';
import { medicineService } from '../../service/medicine';

export class MedicineController implements Controller {
  loadRoutes(router: Router) {
    router.get(
      '/medicines',
      [validatorMiddleware(listMedicines)],
      this.list.bind(this)
    );

    router.get('/sync', this.sync.bind(this));
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await medicineService.list(req.query);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }

  async sync(req: Request, res: Response, next: NextFunction) {
    try {
      await medicineService.sync();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
