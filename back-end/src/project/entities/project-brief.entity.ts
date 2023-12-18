import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Team } from 'src/team/entities/team.entity';

@Entity({
  name: 'project_brief',
})
export class ProjectBrief {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column()
  project_name: string;

  @Column()
  project_description: string;

  @Column()
  project_isCollected: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  project_createTime: Date;

  @ManyToOne(() => Team)
  team: Team;
}
