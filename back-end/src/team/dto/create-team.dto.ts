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

  @IsNotEmpty({
    message: 'pathId不能为空',
  })
  @ApiProperty()
  pathId: string;

  // @ApiProperty()
  // creatorId: string;
}
