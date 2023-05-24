import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TodayMenuModel from "../../../today-menu/repository/sequelize/todayMenu.model";

@Table({
  tableName: "type_of_meal",
  timestamps: false,
})
export default class TypeOfMealModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({allowNull: false})
  declare type: string;

  // @ForeignKey(() => TodayMenuModel)
  // @Column({allowNull: false, field: "today_menu_id"})
  // declare today_menu_id: string

  @Column({allowNull: false})
  declare day: string;

  @Column({ allowNull: false })
  declare active: boolean;
}