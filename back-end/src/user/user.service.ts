import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Logger } from 'winston';
import { RedisService } from 'src/redis/redis.service';
import { HttpException } from '@nestjs/common/exceptions';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtService } from '@nestjs/jwt/dist';
import { LoginUserVo } from './vo/login-user.vo';

@Injectable()
export class UserService {
  private logger = new Logger();
  @InjectRepository(User)
  private usersRepository: Repository<User>;
  @Inject(RedisService)
  private redisService: RedisService;
  @Inject(JwtService)
  private jwtService: JwtService;

  async register(payload: RegisterUserDto) {
    // 根据邮箱查询 redis 存储的验证码
    const captcha = await this.redisService.get(`captcha_${payload.email}`);

    // 若验证码失效
    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    // 若验证码错误
    if (payload.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.usersRepository.findOneBy({
      account: payload.account,
    });

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.account = payload.account;
    newUser.password = payload.password;
    newUser.email = payload.email;
    newUser.nickName = payload.nickName;

    try {
      await this.usersRepository.save(newUser);
      return {
        result: 'OK',
      };
    } catch (e) {
      this.logger.error(e, UserService);
      return;
    }
  }
  async login(payload: LoginUserDto) {
    const user = await this.usersRepository.findOneBy({
      account: payload.account,
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== payload.password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    const vo = new LoginUserVo();
    vo.userInfo = {
      _id: user._id,
      account: user.account,
      password: user.password,
      nickName: user.nickName,
      email: user.email,
      createTime: user.createTime,
    };
    return vo;
  }
  async findUserById(id: number) {
    const user = await this.usersRepository.findOneBy({
      _id: id,
      // account: 'admin',
    });
    console.log(user);
    return {
      id: user._id,
      account: user.account,
      email: user.email,
    };
  }
}
