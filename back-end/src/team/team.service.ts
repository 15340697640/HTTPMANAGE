import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { MongoRepository } from 'typeorm';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeamService {
  private logger = new Logger();
  @InjectRepository(Team)
  private teamRepository: MongoRepository<Team>;

  async getAllTeams() {
    try {
      return await this.teamRepository.find();
    } catch (e) {
      this.logger.error(e, TeamService);
      return;
    }
  }

  async getAllMembers() {
    try {
      return await this.teamRepository.find({ team_name: '蜜雪' });
    } catch (e) {
      console.log(e);
      this.logger.error(e, TeamService);
      return;
    }
  }

  async createTeam(payload: CreateTeamDto) {
    const user = new User();
    user.email = '1214166014@qq.com';
    const newTeam = new Team();
    newTeam.team_name = payload.teamName;
    newTeam.team_description = payload.description;
    newTeam.team_number_member = 1;
    newTeam.path_id = payload.pathId;
    newTeam.members = [user];
    try {
      return await this.teamRepository.save(newTeam);
    } catch (e) {
      this.logger.error(e, TeamService);
      return;
    }
  }
}
