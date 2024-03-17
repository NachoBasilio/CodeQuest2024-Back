import { Module } from '@nestjs/common';
import { RafflesController } from './raffles.controller';
import { RafflesService } from './raffles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RaffleSchema } from './schemas/raffle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Raffle', schema: RaffleSchema }]),
  ],
  controllers: [RafflesController],
  providers: [RafflesService],
})
export class RafflesModule {}
