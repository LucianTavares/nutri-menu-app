import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

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

  @Column({allowNull: false})
  declare day: string;
}