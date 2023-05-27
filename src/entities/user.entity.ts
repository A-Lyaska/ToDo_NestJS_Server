import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Token } from "./token.entity";
import { Todo } from "./todo.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column({ type: "varchar", default: "" })
    email: string;

    @Column({ type: "varchar", default: "" })
    login: string;

    @Column({ type: "varchar", default: "" })
    password: string;

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];
}
