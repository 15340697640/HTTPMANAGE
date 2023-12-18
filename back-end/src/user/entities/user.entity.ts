import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
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
}
