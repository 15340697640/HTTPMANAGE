import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserLoginModule } from './user-login/userLogin.module';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [UserLoginModule, DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
