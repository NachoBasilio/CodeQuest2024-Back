import { Document } from 'mongoose';

export class Raffle extends Document {
  id: string;
  participants: string[];
  dateStart: string;
  dateFinish: string;
  description: string;
  award: string;
}
