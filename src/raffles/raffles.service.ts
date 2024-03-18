import { Injectable } from '@nestjs/common';
import { Raffle } from './raffles.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RafflesService {
  constructor(
    @InjectModel('Raffle') private readonly raffleModel: Model<Raffle>,
  ) {}

  async getAllRaffles() {
    return await this.raffleModel.find().exec();
  }

  async getRaffleById(idRaffle: string) {
    return await this.raffleModel.findOne({ idRaffle }).exec();
  }

  async createARaffle(
    idRaffle: string,
    participants: string[],
    dateStart: string,
    dateFinish: string,
    award: string,
    description: string,
  ) {
    const newRaffle = new this.raffleModel({
      idRaffle,
      participants,
      dateStart,
      dateFinish,
      award,
      description,
    });
    return await newRaffle.save();
  }

  async updateRaffle(idRaffle: string, updatedFields: any) {
    return await this.raffleModel
      .findOneAndUpdate({ idRaffle }, updatedFields, { new: true })
      .exec();
  }

  async deleteRaffle(idRaffle: string) {
    return await this.raffleModel.findOneAndDelete({ idRaffle }).exec();
  }

  async addParticipant(idRaffle: string, participant: any) {
    const raffle = await this.raffleModel.findOne({ idRaffle }).exec();
    raffle.participants.push(participant);
    return await raffle.save();
  }

  async removeParticipant(idRaffle: string, participant: string) {
    const raffle = await this.raffleModel.findOne({ idRaffle }).exec();
    const index = raffle.participants.indexOf(participant);
    if (index !== -1) {
      raffle.participants.splice(index, 1);
      return await raffle.save();
    } else {
      throw new Error('Participante no encontrado');
    }
  }
}
