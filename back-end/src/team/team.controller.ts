import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('allTeam')
  async getAllTeams() {
    return await this.teamService.getAllTeams();
  }
  @Get('allMember')
  async getAllMembers() {
    return await this.teamService.getAllMembers();
  }
  @Post('create')
  async createTeam(@Body() payload: CreateTeamDto) {
    return await this.teamService.createTeam(payload);
  }
}
