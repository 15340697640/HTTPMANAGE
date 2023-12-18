import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  @Inject(ConfigService)
  private readonly configService: ConfigService;

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
}
