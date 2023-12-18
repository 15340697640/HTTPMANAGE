import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

interface JwtUserData {
  userId: number;
  account: string;
  email: string;
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(AuthService)
  private readonly authService: AuthService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride('is-public', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 公共接口直接返回
    if (isPublic) {
      return true;
    }
    const authorization = request.headers.authorization || '';
    const bearer = authorization.split(' ');
    console.log(bearer);

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('用户未登录');
    }

    const token = authorization.split(' ')[1];
    try {
      const data = this.authService.verifyToken(token);

      request.user = {
        userId: data.userId,
        account: data.account,
        email: data.email,
      };

      return true;
    } catch (e) {
      throw new UnauthorizedException('token失效，请重新登录');
    }
  }
}
