import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { URLSearchParams } from 'url';

@Injectable()
export class DiscordService {
  async authDiscord(code: string) {
    if (code) {
      const fromData = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: 'http://localhost:3000/api/auth/discord/redirect/',
      });

      try {
        const output = await axios.post(
          'https://discord.com/api/oauth2/token',
          fromData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        if (output.data) {
          const accessToken = output.data.access_token;
          const userinfo = await axios.get(
            'https://discord.com/api/users/@me',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const guilds = await axios.get(
            'https://discord.com/api/users/@me/guilds',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const isInServer = guilds.data.some(
            (guild) => guild.id === process.env.CHANNEL_ID,
          );

          const isAdmin = guilds.data.some(
            (guild) =>
              guild.id === process.env.CHANNEL_ID && guild.permissions & 0x8,
          );

          return {
            isInServer,
            isAdmin,
            userinfo: userinfo.data,
          };
        }
      } catch (error) {
        console.error(error.response.data);
      }
    }
  }
}
