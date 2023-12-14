import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty({
    message: '团队名不能为空',
  })
  teamName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'pathId不能为空',
  })
  teamId: string;

  @ApiProperty()
  @IsNotEmpty({
    message: '创建者邮箱不能为空',
  })
  ownerEmail: string;
}
