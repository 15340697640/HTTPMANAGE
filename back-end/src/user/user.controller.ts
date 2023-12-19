import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(AuthService)
  private authService: AuthService;

  @Post('/register')
  @SetMetadata('is-public', true)
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.userService.register(registerUserDto);
    return 'success';
  }

  @Get('/register-captcha')
  @SetMetadata('is-public', true)
  async captcha(@Query('emailAddress') emailAddress: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${emailAddress}`, code, 5 * 60);

    await this.emailService.sendMail({
      to: emailAddress,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`,
    });
    return 'success';
  }

  @Post('/login')
  @SetMetadata('is-public', true)
  async login(@Body() loginUserDto: LoginUserDto) {
    const vo = await this.userService.login(loginUserDto);

    // vo.accessToken = this.jwtService.sign(
    //   {
    //     userId: vo.userInfo.id,
    //     account: vo.userInfo.account,
    //     email: vo.userInfo.email,
    //   },
    //   {
    //     expiresIn:
    //       this.configService.get('jwt_access_token_expires_time') || '30m',
    //   },
    // );
    vo.accessToken = this.authService.generateAccessToken({
      userId: vo.userInfo.id,
      account: vo.userInfo.account,
      email: vo.userInfo.email,
    });

    // vo.refreshToken = this.jwtService.sign(
    //   {
    //     userId: vo.userInfo.id,
    //   },
    //   {
    //     expiresIn:
    //       this.configService.get('jwt_refresh_token_expires_time') || '7d',
    //   },
    // );
    vo.refreshToken = this.authService.generateRefreshToken({
      userId: vo.userInfo.id,
    });
    return vo;
  }

  // 刷新接口
  @Get('/refresh')
  @SetMetadata('is-public', true)
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      // const data = this.jwtService.verify(refreshToken);
      const data = this.authService.verifyToken(refreshToken);
      const user = await this.userService.findUserById(data.userId);
      // const access_token = this.jwtService.sign(
      //   {
      //     userId: user.userId,
      //     account: user.account,
      //     email: user.email,
      //   },
      //   {
      //     expiresIn:
      //       this.configService.get('jwt_access_token_expires_time') || '30m',
      //   },
      // );
      const access_token = this.authService.generateAccessToken({
        userId: user.userId,
        account: user.account,
        email: user.email,
      });
      // const refresh_token = this.jwtService.sign(
      //   {
      //     userId: user.userId,
      //   },
      //   {
      //     expiresIn:
      //       this.configService.get('jwt_refresh_token_expires_time') || '7d',
      //   },
      // );
      const refresh_token = this.authService.generateRefreshToken({
        userId: user.userId,
      });
      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new HttpException(
        'token 已失效，请重新登录',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
