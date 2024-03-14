import { Module } from '@nestjs/common';
import { RafflesModule } from './api/raffles/raffles.module';
import { DiscordModule } from './api/auth/discord/discord.module';

@Module({
  imports: [RafflesModule, DiscordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
