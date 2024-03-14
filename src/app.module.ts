import { Module } from '@nestjs/common';
import { RafflesModule } from './raffles/raffles.module';

@Module({
  imports: [RafflesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
