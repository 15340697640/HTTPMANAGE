import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Member } from 'src/member/entities/member.entity';
import { ProjectBrief } from 'src/project/entities/project-brief.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, Member, ProjectBrief])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
