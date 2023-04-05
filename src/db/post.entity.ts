import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DataType } from 'sequelize-typescript';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public isCompleted: boolean;
}

export default Post;
