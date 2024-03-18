import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RafflesService } from './raffles.service';
import { CreateRaffleDto } from './dto/raffle.dto';

@Controller('api/raffles')
export class RafflesController {
  constructor(private raffleService: RafflesService) {}

  @Get()
  async getAllReffles() {
    return await this.raffleService.getAllRaffles();
  }

  @Post()
  async createRaffle(@Body() newRaffle: CreateRaffleDto) {
    const createdRaffle = await this.raffleService.createARaffle(
      newRaffle.idRaffle,
      newRaffle.participants,
      newRaffle.dateStart,
      newRaffle.dateFinish,
      newRaffle.award,
      newRaffle.description,
    );
    return 'Sorteo creado con ID: ' + createdRaffle.idRaffle;
  }

  @Delete(':idRaffle')
  async deleteRaffle(@Param('idRaffle') idRaffle: string) {
    await this.raffleService.deleteRaffle(idRaffle);
    return 'Sorteo con ID ' + idRaffle + ' eliminado';
  }

  @Get(':idRaffle')
  async getRaffleById(@Param('idRaffle') idRaffle: string) {
    return await this.raffleService.getRaffleById(idRaffle);
  }

  @Put(':idRaffle')
  async updateRaffle(
    @Param('idRaffle') idRaffle: string,
    @Body() updatedFields: any,
  ) {
    const updatedRaffle = await this.raffleService.updateRaffle(
      idRaffle,
      updatedFields,
    );
    return 'Sorteo con ID ' + updatedRaffle.idRaffle + ' actualizado';
  }
  @Post(':idRaffle/participants')
  async addParticipant(
    @Param('idRaffle') idRaffle: string,
    @Body('participant') participant: string,
  ) {
    const updatedRaffle = await this.raffleService.addParticipant(
      idRaffle,
      participant,
    );
    return 'Participante agregado al sorteo con ID ' + updatedRaffle.idRaffle;
  }

  @Delete(':idRaffle/participants/:participantId')
  async removeParticipant(
    @Param('idRaffle') idRaffle: string,
    @Param('participantId') participantId: string,
  ) {
    await this.raffleService.removeParticipant(idRaffle, participantId);
    return 'Participante eliminado del sorteo con ID ' + idRaffle;
  }
}
