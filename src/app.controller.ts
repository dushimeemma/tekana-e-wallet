import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getWelcome(@Res() res) {
    return res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Welcome to Tekana e Wallet',
      data: null,
    });
  }
}
