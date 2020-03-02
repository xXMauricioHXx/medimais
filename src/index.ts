import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
const csvToJson = require('convert-csv-to-json');

export interface Medicine {
    SUBSTANCIA: string;
    CNPJ: string;
}

const app = express();

app.listen(3000, () => console.log(`Server running on http://localhost:3000`));

app.get('/medicines', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {min = 0, max = 10} = req.query;
        const results = await csvToJson.getJsonFromCsv(path.join(__dirname, '/csv/data.csv'));
        console.log(results[0]);
        const reducedResults = results
            .map((result: any) => result['SUBSTANCIA'])
            .reduce((acc: any, current:any, index: any) => 
                (index >= min && index <=max) ? acc.concat(current) : acc, []);

        res.send(reducedResults);
        return next();
    } catch(err) {
        return next(err);
    }
})
