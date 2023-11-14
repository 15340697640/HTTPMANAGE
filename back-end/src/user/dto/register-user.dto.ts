import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  account: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '昵称不能为空',
  })
  nickName: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}
