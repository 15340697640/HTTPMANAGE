import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectBrief } from './entities/project-brief.entity';
import { Repository } from 'typeorm';
import { Logger } from 'winston';

@Injectable()
export class ProjectService {
  private logger = new Logger();
  @InjectRepository(ProjectBrief)
  private readonly projectBriefRepository: Repository<ProjectBrief>;

  async isCollectProject(id: number, isCollected: boolean) {
    return await this.projectBriefRepository.update(
      { id: id },
      { project_isCollected: isCollected },
    );
  }
}
