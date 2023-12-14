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
      const res = await this.memberRepository.find({
        where: { member_email: email },
        relations: ['team'],
      });
      const data = res.map((element) => {
        return {
          member_role: element.member_role,
          team_name: element.team.team_name,
          team_id: element.team.team_id,
        };
      });
      return data;
    } catch (e) {
      this.logger.error(e, TeamService);
      return;
    }
  }

  // async getAllMembers() {
  //   try {
  //     return await this.teamRepository.find({ team_name: '蜜雪' });
  //   } catch (e) {
  //     console.log(e);
  //     this.logger.error(e, TeamService);
  //     return;
  //   }
  // }

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
