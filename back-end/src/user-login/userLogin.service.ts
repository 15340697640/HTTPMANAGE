import { Injectable } from '@nestjs/common';

@Injectable()
export class UserLoginService {
  login(): string {
    return 'Hello World!';
  }
}
