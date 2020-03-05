import mongoose, { Schema, Document } from 'mongoose';

export interface Medicine extends Document {
  substancia: string;
  cpnj: string;
  descricao: string;
  tarja: string;
}

const medicineSchema = new Schema({
  substancia: {
    type: String,
    required: true,
  },
  cpnj: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  tarja: {
    type: String,
    required: true,
  },
});

export const medicineModel = mongoose.model<Medicine>(
  'medicine',
  medicineSchema
);
