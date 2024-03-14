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
  getAllReffles() {
    return this.raffleService.getAllRaffles();
  }

  @Post()
  createRaffle(@Body() newRaffle: CreateRaffleDto) {
    this.raffleService.createARaffle(
      newRaffle.participants,
      newRaffle.dateStart,
      newRaffle.dateFinish,
      newRaffle.award,
      newRaffle.description,
    );
    return 'Guardado';
  }

  @Delete(':id')
  deleteRaffle(@Param('id') id: string) {
    this.raffleService.deleteRaffle(id);
    return 'id eliminado';
  }

  @Get(':id')
  getRaffleById(@Param('id') id: string) {
    return this.raffleService.getRaffleById(id);
  }

  @Put(':id')
  updateRaffle(@Param('id') id: string, @Body() updatedFields: any) {
    this.raffleService.updateRaffle(id, updatedFields);
    return 'Actualizado';
  }
}
