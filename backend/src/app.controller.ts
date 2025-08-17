import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api/api.service';

@Controller()
export class AppController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  root() {
    return { message: 'Hello from NestJS!' };
  }
  
  @Get('external')
  async getExternalData() {
    return this.apiService.getData();
  }
}