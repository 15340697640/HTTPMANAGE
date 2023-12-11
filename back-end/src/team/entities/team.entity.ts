import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  ObjectId,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Team {
  @ObjectIdColumn()
  team_id: ObjectId;

  @Column()
  team_name: string;

  @Column()
  team_description: string;

  @Column()
  team_number_member: number;

  @Column()
  path_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  team_createTime: Date;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  members: User[];
}
