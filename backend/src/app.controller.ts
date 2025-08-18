// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api/api.service';

@Controller()
export class AppController {
  constructor(private readonly apiService: ApiService) { }

  @Get()
  root() {
    return { message: 'Hello from NestJS!' };
  }

  @Get('external')
  async getExternalData() {
    return this.apiService.getData('$filter=cast(kindId,%27Edm.Guid%27)%20eq%20faeac0e6-0c6d-f011-8dca-7c1e524deb5b&$skip=0&$top=30&$count=true');
  }
  @Get('frames')
  async getFramesData() {
    let query =
      '$filter=cast(kindId,%27Edm.Guid%27)%20eq%20faeac0e6-0c6d-f011-8dca-7c1e524deb5b&$skip=0&$top=30&$count=true';

    const response = await this.apiService.getData(query);
    console.log('Ответ от API:', response);

    // Берём именно массив
    const items = response?.result?.data ?? [];
    // Преобразуем под Angular (например, только имена)
    return items.map((item: any) => item.name);
  }
}