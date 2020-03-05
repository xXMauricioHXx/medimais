const csvToJson = require('convert-csv-to-json');
import { medicineModel } from '../http/model/medicine';
import path from 'path';

export interface FilterDTO {
  min?: number;
  max?: number;
}

export interface MedicineMap {
  SUBSTANCIA: string;
  CNPJ: string;
  APRESENTACAO: string;
  TARJA: string;
  PFSemImposto: string;
}

class MedicineService {
  async list(filter: FilterDTO) {
    const { min = 0, max = 10 } = filter;
  }

  async sync() {
    const results: MedicineMap[] = await csvToJson.getJsonFromCsv(
      path.join(__dirname, '../csv/data.csv')
    );

    const reducedResults = results.map((result: MedicineMap) => ({
      substancia: result['SUBSTANCIA'],
      cpnj: result['CNPJ'],
      descricao: result['APRESENTACAO'],
      tarja: result['TARJA'],
      pf_sem_imposto: result['PFSemImposto'],
    }));

    reducedResults.map(async result => {
      const medicine = await medicineModel.findOne({
        cnpj: result.cpnj,
        descricao: result.descricao,
      });

      if (!medicine) {
        await medicineModel.create(reducedResults);
      }
    });
    '';
  }
}

export const medicineService = new MedicineService();
