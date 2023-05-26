import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Token } from "./token.entity";
import { Todo } from "./todo.entity";

@Table({ tableName: "users" })
export class User extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    userId: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    email: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    login: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    password: string;

    @HasMany(() => Todo)
    todos: Todo[];

    @HasMany(() => Token)
    tokens: Token[];
}

export default Todo;