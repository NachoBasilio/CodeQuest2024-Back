import { Module } from '@nestjs/common';
import { RafflesController } from './raffles.controller';
import { RafflesService } from './raffles.service';

@Module({
  controllers: [RafflesController],
  providers: [RafflesService],
})
export class RafflesModule {}
