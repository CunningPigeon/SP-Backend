// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api/api.service';

@Controller()
export class AppController {
  constructor(
    private readonly apiService: ApiService,
  ) { }

  @Get()
  root() {
    return { message: 'Hello from NestJS!' };
  }

  @Get('frame')
  async getFrameData() {
    return this.apiService.getData('$filter=cast(kindId,%27Edm.Guid%27)%20eq%20faeac0e6-0c6d-f011-8dca-7c1e524deb5b&$skip=0&&$orderby=subKindName%20desc&$count=true');
  }

  @Get('facade')
  async getFacadelData() {
    return this.apiService.getData('&$skip=0&$top=30&$orderby=subKindName%20desc&$count=true');
  }

}