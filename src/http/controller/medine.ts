const csvToJson = require('convert-csv-to-json');
import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { validatorMiddleware } from '../middlewares/validators';
import { listMedicines } from '../schema/medicine';

export interface Medicine {
    SUBSTANCIA: string;
    CNPJ: string;
    APRESENTACAO: string;
    TARJA: string;
    PFSemImposto: string;
}

export class MedicineController implements Controller {
    loadRoutes(router: Router){
        router.get('/medicines', [validatorMiddleware(listMedicines)], this.list.bind(this))
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const {min = 0, max = 10} = req.query;
            const results: Medicine[] = await csvToJson.getJsonFromCsv(path.join(__dirname, '../../csv/data.csv'));
            
            const reducedResults = results
                .map((result: Medicine) => 
                    ({
                        substancia: result['SUBSTANCIA'],
                        cpnj: result['CNPJ'], 
                        descricao: result['APRESENTACAO'],
                        tarja: result['TARJA'],
                        pf_sem_imposto: result['PFSemImposto']
                    }))
                .reduce((acc: Medicine[] , current: any, index: number) => 
                    (index >= min && index <=max) ? acc.concat(current) : acc, []);
    
            res.send(reducedResults);
            return next();
        } catch(err) {
            return next(err);
        }
    }
}