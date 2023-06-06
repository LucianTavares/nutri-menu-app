import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TodayMenuModel from "../../../today-menu/repository/sequelize/todayMenu.model";

@Table({
  tableName: "user",
  timestamps: false
})
export default class UserModel extends Model {

  @PrimaryKey
  @Column
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare email: string

  @HasMany(() => TodayMenuModel, {
    onDelete: 'CASCADE'
  })
  declare todayMenu: TodayMenuModel[]

  @Column({ allowNull: false })
  declare active: boolean
}