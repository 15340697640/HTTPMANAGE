import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { TeamModule } from './team/team.module';
import { User } from './user/entities/user.entity';
import { Team } from './team/entities/team.entity';
import { Member } from './member/entities/member.entity';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'), // 此处不能使用localhost，否则连接失败
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          retryDelay: 500,
          retryAttempts: 10,
          entities: [User, Team, Member],
          logging: true,
          synchronize: true,
          poolSize: 10,
          connectorPackage: 'mysql2',
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: configService.get('jwt_access_token_expires_time'),
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    EmailModule,
    RedisModule,
    TeamModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
