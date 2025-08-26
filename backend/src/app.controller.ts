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

  @Get('full')
  async getFullData() {
    return this.apiService.getData('$skip=0&$orderby=subKindTypeName%20desc&$count=true');
  }

  @Get('frame')
  async getFrameData() {
    return this.apiService.getData('$filter=cast(kindId,%27Edm.Guid%27)%20eq%20faeac0e6-0c6d-f011-8dca-7c1e524deb5b&$skip=0&$orderby=subKindName%20desc&$count=true');
  }

  @Get('facade')
  async getFacadelData() {
    return this.apiService.getData('$filter=cast(kindId,%27Edm.Guid%27)%20eq%206deca9f4-6d02-ef11-aaf0-6045bd90b888&$skip=0&$top=30&$orderby=subKindName%20desc&$count=true');
  }

  @Get('module')
  async getModuleData() {
    return this.apiService.getData('$filter=cast(kindId,%27Edm.Guid%27)%20eq%20aadee0ce-3c82-f011-b481-000d3a461c38&$skip=0&$orderby=subKindName%20desc&$count=true');
  }

}