import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from 'src/team/entities/team.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  member_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  member_email: string;

  @Column({
    comment: '0: owner, 1: admin, 2:user ',
  })
  member_role: number;

  @CreateDateColumn({ type: 'timestamp' })
  member_createTime: Date;

  @ManyToOne(() => Team)
  team: Team;
}
