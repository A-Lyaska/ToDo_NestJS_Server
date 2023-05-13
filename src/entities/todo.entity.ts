import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: 'Title' })
  public title: string;

  @Column({ default: '' })
  public description: string;

  @Column({ default: false })
  public isCompleted: boolean;
}

export default Todo;
