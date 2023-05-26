import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./user.entity";


@Table({ tableName: "tokens" })
export class Token extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    value: string;
}

export default Token;