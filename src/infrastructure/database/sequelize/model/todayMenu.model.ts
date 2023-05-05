import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import MixturesModel from "./mixtures.model";
import TypeOfMealModel from "./typeOfMeal.model";

@Table({
  tableName: "today_menu",
  timestamps: false
})
export default class TodayMenuModel extends Model {

  @PrimaryKey
  @Column
  declare id: string

  @HasMany(() => MixturesModel, { foreignKey: "mixture_id", as: "mixtures" })
  declare mixtures: Awaited<MixturesModel[]>

  @HasOne(() => TypeOfMealModel, { foreignKey: "type_of_meal_id", as: "type_of_meal" })
  @Column({ allowNull: false })
  declare type_of_meal_id: string

  @Column({ allowNull: false })
  declare its_frozen: boolean

  @Column({ allowNull: false })
  declare active: boolean
}