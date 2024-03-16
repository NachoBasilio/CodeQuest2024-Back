import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { URLSearchParams } from 'url';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DiscordService {
  async authDiscord(code: string, number: string) {
    if (code) {
      const fromData = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri:
          'http://localhost:3000/api/auth/discord/redirect/' + number,
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

        if (output && output.data) {
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

          if (guilds && guilds.data) {
            const isInServer = guilds.data.some(
              (guild) => guild.id === process.env.CHANNEL_ID,
            );

            const isAdmin = guilds.data.some(
              (guild) =>
                guild.id === process.env.CHANNEL_ID && guild.permissions & 0x8,
            );

            const payload = {
              isInServer,
              isAdmin,
              userinfo: userinfo.data,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: '1h',
            });

            return {
              token,
              ...payload,
            };
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
