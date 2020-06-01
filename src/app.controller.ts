import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
