import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AlertGateway } from './alert.gateway';

@Controller('alert')
export class AlertController {
  constructor(private alertGateWay: AlertGateway) {}

  @Post()
  @HttpCode(200)
  sendAlertToAll(@Body() dto: { message: string }) {
    console.log('Hi from controller');
    console.log(dto);
    this.alertGateWay.sendToAll(dto.message);
    return dto;
  }
}
