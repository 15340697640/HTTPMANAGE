import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: '账号不能为空',
  })
  account: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
