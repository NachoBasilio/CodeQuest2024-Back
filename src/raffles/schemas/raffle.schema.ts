import { Schema } from 'mongoose';

export const RaffleSchema = new Schema({
  participants: { type: [String], required: true },
  dateStart: { type: String, required: true },
  dateFinish: { type: String, required: true },
  description: { type: String, required: true },
  award: { type: String, required: true },
  idRaffle: { type: String, required: true },
});
