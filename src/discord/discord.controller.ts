import { Controller, Get, Query, Res } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { Response } from 'express';

@Controller('api/auth/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('/redirect')
  async authDiscord(@Query('code') code: string, @Res() res: Response) {
    const userinfo = await this.discordService.authDiscord(code);
    res.cookie('userinfo', JSON.stringify(userinfo));
    res.redirect('/user.html');
  }
}
