/*
apiHost: `https://api.start.e-portal.by/`,
signalREndpoint: `https://api.start.e-portal.by/signalRHub`,
tokenUrl: `https://start.e-portal.by/api/token`,
*/

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly API_HOST = 'https://api.start.e-portal.by';
  // FIXME: Написать логику получения токена
  private readonly API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJc0FkbWluIjoiVHJ1ZSIsIlVzZXJOYW1lIjoiTS5EdW5heSIsIlVzZXJJZCI6IjA0OGEyZDM4LWEzZTktNDIzNi05NmY1LTA4ZGQ5OGZmZTJjYiIsImV4cCI6MTc1NTUyMTg5OCwiaXNzIjoic3RhcnQuZS1wb3J0YWwiLCJhdWQiOiJzdGFydC5lLXBvcnRhbCJ9.F5ztzUVo2NUdwAAuiH3aYl8Qx7VNctlYoPreHVLjXsk'; // токен в виде строки

  constructor(private readonly httpService: HttpService) { }

  async getData(query): Promise<any> {
    try {
      const url = `${this.API_HOST}/api/catalog/product/query?${query}`; // /api/catalog/product/query

      // Используем POST
      const response = await firstValueFrom(
        this.httpService.post(
          url,
          {
            // $filter: "cast(kindId,'Edm.Guid') eq faeac0e6-0c6d-f011-8dca-7c1e524deb5b",
            // $skip: 0,
            // $top: 30,
            // $count: true,
          },
          {
            headers: {
              Authorization: `Bearer ${this.API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            responseType: 'text', // получаем raw HTML/JSON как текст
          },
        ),
      );

      let data;
      try {
        data = JSON.parse(response.data);
      } catch {
        console.warn('Ответ не является JSON, возвращаем как текст');
        data = response.data;
      }

      return data;
    } catch (error: any) {
      console.error('Ошибка API:', error.response?.data || error.message);
      throw new Error(
        `Ошибка при вызове API: ${error.response?.data || error.message}`,
      );
    }
  }


}