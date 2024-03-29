import { Module } from '@nestjs/common';
import { RafflesModule } from './raffles/raffles.module';
import { DiscordModule } from './discord/discord.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Module({
  imports: [
    RafflesModule,
    DiscordModule,
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.s4634ol.mongodb.net/test',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
