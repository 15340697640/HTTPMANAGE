import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() //
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
  entryTime: Date;
}
