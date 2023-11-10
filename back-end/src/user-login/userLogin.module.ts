import { Module } from '@nestjs/common';
import { UserLoginService } from './userLogin.service';
import { UserLoginController } from './userLogin.controller';

@Module({
  controllers: [UserLoginController],
  providers: [UserLoginService],
})
export class UserLoginModule {}
