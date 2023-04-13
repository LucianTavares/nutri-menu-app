import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "mixtures",
  timestamps: false
})
export default class MixturesModel extends Model {

  @PrimaryKey
  @Column
  declare id: string

  @Column({allowNull: false})
  declare mixture: string

  @Column({allowNull: false})
  declare can_freeze: boolean

  @Column({allowNull: false})
  declare active: boolean
}