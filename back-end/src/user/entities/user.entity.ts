import { Team } from 'src/team/entities/team.entity';
import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  ObjectId,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() //
  _id: ObjectId;

  @Column()
  account: string;

  @Column({ type: 'varchar', length: 255 })
  nickName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @ManyToMany(() => Team, (team) => team.members)
  teams: Team[];
}
