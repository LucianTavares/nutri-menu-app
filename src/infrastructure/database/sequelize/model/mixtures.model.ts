import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import TodayMenuModel from "./todayMenu.model";

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
