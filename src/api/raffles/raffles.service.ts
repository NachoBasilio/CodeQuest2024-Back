import { Injectable } from '@nestjs/common';
import { Raffle } from './raffles.entity';

@Injectable()
export class RafflesService {
  private raffles: Raffle[] = [
    {
      id: '1',
      participants: ['Nacho'],
      dateStart: 'Hoy',
      dateFinish: 'Mañana',
      award: 'nintendo switch',
      description: "Una consola de 'ultima' generacion",
    },
  ];

  getAllRaffles() {
    return this.raffles;
  }
  createARaffle(
    participants: string[],
    dateStart: string,
    dateFinish: string,
    award: string,
    description: string,
  ) {
    this.raffles.push({
      participants,
      dateFinish,
      dateStart,
      award,
      description,
      id: (this.raffles.length + 1).toString(),
    });
  }

  getRaffleById(id: string) {
    return this.raffles.find((el) => el.id === id);
  }

  updateRaffle(id: string, updatedFields: any) {
    this.raffles = this.raffles.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          ...updatedFields,
        };
      }
      return el;
    });
  }

  deleteRaffle(id: string) {
    this.raffles = this.raffles.filter((el) => {
      return el.id !== id;
    });
  }
}
