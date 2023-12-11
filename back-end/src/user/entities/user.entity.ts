import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn() //
  _id: number;

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
}
