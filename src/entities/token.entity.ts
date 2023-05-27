import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "tokens" })
export class Token {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @ManyToOne(() => User, user => user.tokens, { nullable: false })
    user: User;

    @Column({ type: "varchar", primary: true, unique: true, nullable: false })
    auth_token: string;
}
