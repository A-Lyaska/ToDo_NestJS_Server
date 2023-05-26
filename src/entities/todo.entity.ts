import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.entity";
@Table({ tableName: "todos" })
export class Todo extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',

    })
    title: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    description: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isCompleted: boolean;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;

}

export default Todo;
