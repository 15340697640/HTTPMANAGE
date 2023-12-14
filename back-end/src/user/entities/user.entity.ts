import { Team } from 'src/team/entities/team.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() //
  id: number;

  @Column()
  account: string;

  @Column({ type: 'varchar', length: 255 })
  nickName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  // @ManyToMany(() => Team, (team) => team.users)
  // @JoinTable()
  // teams: Team[];
}
