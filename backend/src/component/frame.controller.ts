// frame.controller.ts
import { Controller, Get } from '@nestjs/common';


@Controller('frames')
export class FrameController {
  // constructor(private readonly apiService: ApiService) {}

  @Get('options')
  async getOptions() {
    const data = await this.apiService.getData();
    // Преобразуем под нужный формат для Angular
    return data.map((item: any) => item.name); // например, получаем массив строк
  }
}
