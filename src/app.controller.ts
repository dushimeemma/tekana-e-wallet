import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getWelcome(): { success: boolean; message: string } {
    return { success: true, message: 'Welcome to Tekana e Wallet' };
  }
}
