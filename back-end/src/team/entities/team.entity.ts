import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Member } from 'src/member/entities/member.entity';
import { ProjectBrief } from 'src/project/entities/project-brief.entity';

@Entity({
  name: 'team',
})
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  team_name: string;

  @Column()
  team_description: string;

  @Column()
  team_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  team_createTime: Date;

  @OneToMany(() => Member, (member) => member.team, { cascade: true })
  members: Member[];

  @OneToMany(() => ProjectBrief, (projectBrief) => projectBrief.team, {
    cascade: true,
  })
  projectBriefs: ProjectBrief[];
}
