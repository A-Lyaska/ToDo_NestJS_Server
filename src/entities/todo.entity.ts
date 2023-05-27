import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", default: "" })
    title: string;

    @Column({ type: "varchar", default: "" })
    description: string;

    @Column({ type: "boolean", default: false })
    isCompleted: boolean;

    @PrimaryGeneratedColumn("uuid")
    userId: string;
    
    @ManyToOne(() => User, user => user.todos, { nullable: true })
    user: User;
}
