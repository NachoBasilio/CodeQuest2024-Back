import { Controller, Get, Query, Res, Param } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Response } from 'express';

@Controller('api/auth/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('/redirect/:id')
  async authDiscord(
    @Query('code') code: string,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const { token, ...userinfo } = await this.discordService.authDiscord(
        code,
        id,
      );
      res.cookie('token', token);
      res.cookie('userinfo', JSON.stringify(userinfo));
      res.redirect('/user.html');
    } catch (error) {
      console.error('Error al autenticar con Discord:', error);
    }
  }
}
