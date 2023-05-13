import { IsDefined } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({unique: true})
  @IsDefined()
  public email: string;

  @Column()
  @IsDefined()
  public password: string;
}

export default User;