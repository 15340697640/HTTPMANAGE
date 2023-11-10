import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginService } from './userLogin.service';
import { ApiTags, ApiProperty } from '@nestjs/swagger';

class CreateNewDto {
  @ApiProperty()
  account: string;
  @ApiProperty()
  password: string;
}

@ApiTags('user-login')
@Controller('userLogin')
export class UserLoginController {
  constructor(private readonly userLoginService: UserLoginService) {}

  @Post()
  login(@Body() payload: CreateNewDto) {
    console.log(payload);
    return { result: 'ok' };
  }
}
