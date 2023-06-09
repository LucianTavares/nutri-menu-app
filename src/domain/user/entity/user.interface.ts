import TodayMenu from "../../today-menu/entity/todayMenu";

export default interface UserInterface {

  get id(): string
  get name(): string
  get email(): string
  get todayMenu(): TodayMenu[]
}