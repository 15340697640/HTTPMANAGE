import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Member } from 'src/member/entities/member.entity';

@Injectable()
export class TeamService {
  private logger = new Logger();
  @InjectRepository(Team)
  private teamRepository: Repository<Team>;
  @InjectRepository(User)
  private userRepository: Repository<User>;
  @InjectRepository(Member)
  private memberRepository: Repository<Member>;

  async getTeams(email: string) {
    try {
      const data = await this.memberRepository.find({
        where: { member_email: email },
        relations: ['team'],
      });
      const res = data.map((element) => {
        return {
          member_role: element.member_role,
          team_name: element.team.team_name,
          team_id: element.team.team_id,
        };
      });
      return res;
    } catch (e) {
      this.logger.error(e, TeamService);
      return;
    }
  }

  async getTeamProject(teamId: string) {
    try {
      const data = await this.teamRepository.findOne({
        where: { team_id: teamId },
        relations: ['projectBriefs'],
      });
      const res = data.projectBriefs.map((element) => {
        return {
          projectId: element.id,
          projectName: element.project_name,
          projectDescription: element.project_description,
          projectCreateTime: element.project_createTime,
          isCollected: element.project_isCollected,
        };
      });
      return res;
    } catch (e) {
      this.logger.error(e, TeamService);
      return;
    }
  }

  async addTeam(payload: CreateTeamDto) {
    const user = await this.userRepository.findOneBy({
      email: payload.ownerEmail,
    });
    const newMember = new Member();
    newMember.member_email = user.email;
    newMember.member_name = user.nickName;
    newMember.member_role = 0; // owner

    const newTeam = new Team();
    newTeam.team_name = payload.teamName;
    newTeam.team_description = payload.description;
    newTeam.team_id = payload.teamId;
    newTeam.members = [newMember];
    try {
      return await this.teamRepository.save(newTeam);
    } catch (e) {
      this.logger.error(e, TeamService);
      return;
    }
  }
}
