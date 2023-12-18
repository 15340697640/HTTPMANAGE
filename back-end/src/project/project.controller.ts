import { Body, Controller, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post('isCollect')
  async isCollectProject(
    @Body('projectId') projectId: number,
    @Body('isCollected') isCollected: boolean,
  ) {
    return await this.projectService.isCollectProject(projectId, isCollected);
  }
}
