import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectBrief } from './entities/project-brief.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectBrief])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
