import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  test(): string {
    console.log('Test 123')
    return 'Test 123';
  }
}
