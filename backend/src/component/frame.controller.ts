// frame.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';


@Controller('frame')
export class FrameController {
  constructor(private readonly apiService: ApiService) { }

  @Get('options')
  async getOptions() {
    return this.apiService.getData('$filter=cast(kindId,%27Edm.Guid%27)%20eq%20faeac0e6-0c6d-f011-8dca-7c1e524deb5b&$skip=0&$top=30&$count=true');
  }
}
