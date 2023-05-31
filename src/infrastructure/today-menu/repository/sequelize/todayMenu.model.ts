import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import MixturesModel from "../../../mixture/repository/sequelize/mixtures.model";
import TypeOfMealModel from "../../../type-of-meal/repository/sequelize/typeOfMeal.model";

@Table({
  tableName: "today_menu",
  timestamps: false
})
export default class TodayMenuModel extends Model {

  @PrimaryKey
  @Column
  declare id: string

  @Column({ allowNull: false })
  declare its_frozen: boolean;

  @Column({ allowNull: false })
  declare active: boolean;

  @HasMany(() => MixturesModel, {
    onDelete: 'CASCADE'
  })
  declare mixtures: MixturesModel[];

  @HasMany(() => TypeOfMealModel, {
    onDelete: 'CASCADE'
  })
  declare type_of_meal: TypeOfMealModel[];
}