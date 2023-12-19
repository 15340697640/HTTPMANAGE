import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { md5 } from 'src/utils';

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  @InjectRepository(User)
  private userRepository: Repository<User>;

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  generateAccessToken(userInfo: object) {
    return this.jwtService.sign(userInfo, {
      expiresIn:
        this.configService.get('jwt_access_token_expires_time') || '30m',
    });
  }

  generateRefreshToken(userInfo: object) {
    return this.jwtService.sign(userInfo, {
      expiresIn:
        this.configService.get('jwt_refresh_token_expires_time') || '7d',
    });
  }

  async verifySign(
    sign: string,
    accessToken: string,
    time: string,
    id: number,
  ) {
    // 第一步：验证签名的加密规则是否正确
    if (
      md5(`${accessToken}@${time}@${this.configService.get('sign_key')}`) !==
      sign
    )
      return false;

    // 第二步: 验证签名是否已经发送过
    const { signature } = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['signature'],
    });

    // 如果数据库里签名为空则先保存
    if (!signature) {
      await this.userRepository.update(id, {
        ['signature']: sign,
      });
    }
    // 如果数据库里签名不为空则判断是否相等，若相等，则表示该签名已经发送过
    else if (signature === sign) {
      return false;
    }
    return true;
  }
}
