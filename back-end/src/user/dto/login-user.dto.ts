import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: '账号不能为空',
  })
  account: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
