import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('getTeams')
  async getTeams(@Query('email') email: string) {
    return await this.teamService.getTeams(email);
  }

  @Get('getTeamProjects')
  async getTeamProject(@Query('teamId') teamId: string) {
    return await this.teamService.getTeamProject(teamId);
  }
  @Post('addTeam')
  async addTeam(@Body() payload: CreateTeamDto) {
    return await this.teamService.addTeam(payload);
  }
}
