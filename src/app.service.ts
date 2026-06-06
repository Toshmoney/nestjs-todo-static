import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the NestJS API! This is a simple example of a RESTful API built with NestJS. You can customize this message or add more functionality as needed.';
  }
}
