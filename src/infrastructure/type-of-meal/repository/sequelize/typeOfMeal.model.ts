import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TodayMenuModel from "../../../today-menu/repository/sequelize/todayMenu.model";

@Table({
  tableName: "type_of_meal",
  timestamps: false,
})
export default class TypeOfMealModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare type: string;

  @Column({ allowNull: false })
  declare day: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @ForeignKey(() => TodayMenuModel)
  @Column({ allowNull: true })
  declare today_menu_id: string;

  @BelongsTo(() => TodayMenuModel, {
    onDelete: 'CASCADE'
  })
  declare today_menu: Awaited<TodayMenuModel>
}