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

  async getRaffleById(id: string) {
    return await this.raffleModel.findById(id).exec();
  }

  async createARaffle(
    id: string,
    participants: string[],
    dateStart: string,
    dateFinish: string,
    award: string,
    description: string,
  ) {
    const newRaffle = new this.raffleModel({
      id,
      participants,
      dateStart,
      dateFinish,
      award,
      description,
    });
    return await newRaffle.save();
  }

  async updateRaffle(id: string, updatedFields: any) {
    return await this.raffleModel
      .findByIdAndUpdate(id, updatedFields, { new: true })
      .exec();
  }

  async deleteRaffle(id: string) {
    return await this.raffleModel.findByIdAndDelete(id).exec();
  }
}
