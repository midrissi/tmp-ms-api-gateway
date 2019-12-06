import { Schema } from 'mongoose';

export const CabineSchema = new Schema({
  name: String,
  number: Number,
});
