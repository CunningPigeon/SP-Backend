/*
apiHost: `https://api.start.e-portal.by/`,
signalREndpoint: `https://api.start.e-portal.by/signalRHub`,
tokenUrl: `https://start.e-portal.by/api/token`,
*/

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly API_HOST = 'https://api.start.e-portal.by';
  private readonly tokenUrl: `https://start.e-portal.by/api/token`;
  data = { login: 'Test', password: 'Test' };
  constructor(private readonly httpService: HttpService) { }

  // FIXME: Написать логику получения токена
  private readonly API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJc0FkbWluIjoiVHJ1ZSIsIlVzZXJOYW1lIjoiTS5EdW5heSIsIlVzZXJJZCI6IjA0OGEyZDM4LWEzZTktNDIzNi05NmY1LTA4ZGQ5OGZmZTJjYiIsImV4cCI6MTc1Njc0MDYzNSwiaXNzIjoic3RhcnQuZS1wb3J0YWwiLCJhdWQiOiJzdGFydC5lLXBvcnRhbCJ9.sXhlIOFuPLZTFKrQggCqo0WsMvRBXp1OsKsnSfymdFY';

  async getToken(): Promise<string> {
    const url = `${this.API_HOST}/api/token`;
    const body = {
      login: this.data['login'],
      password: this.data['password'],
      locale: 'ru',
      source: 'client_app',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      console.log('Ответ:', response.data);
      return response.data.token;
    } catch (error) {
      console.error(
        'Ошибка получения токена:',
        error.response?.status,
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async getData(query): Promise<any> {
    try {
      const url = `${this.API_HOST}/api/catalog/product/query?${query}`;

      // Используем POST
      const response = await firstValueFrom(
        this.httpService.post(
          url,{},
          {
            headers: {
              Authorization: `Bearer ${this.API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            responseType: 'text',
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