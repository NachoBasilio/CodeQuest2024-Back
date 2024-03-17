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
      newRaffle.id,
      newRaffle.participants,
      newRaffle.dateStart,
      newRaffle.dateFinish,
      newRaffle.award,
      newRaffle.description,
    );
    return 'Sorteo creado con ID: ' + createdRaffle.id;
  }

  @Delete(':id')
  async deleteRaffle(@Param('id') id: string) {
    await this.raffleService.deleteRaffle(id);
    return 'Sorteo con ID ' + id + ' eliminado';
  }

  @Get(':id')
  async getRaffleById(@Param('id') id: string) {
    return await this.raffleService.getRaffleById(id);
  }

  @Put(':id')
  async updateRaffle(@Param('id') id: string, @Body() updatedFields: any) {
    const updatedRaffle = await this.raffleService.updateRaffle(
      id,
      updatedFields,
    );
    return 'Sorteo con ID ' + updatedRaffle.id + ' actualizado';
  }
}
