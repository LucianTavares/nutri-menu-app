import DayOfTheWeek from "../../today-menu/entity/value-object/dayOfTheWeek";


export default class TypeOfMeal {

  private _id: string;
  private _type: string;
  private _dayOfTheWeek!: DayOfTheWeek;
  private _active: boolean = false;

  constructor(id: string, type: string) {
    this._id = id;
    this._type = type;
    this.validate();
  }

  get id(): string {
    return this._id
  }

  get type(): string {
    return this._type;
  }

  get DayOfTheWeek(): DayOfTheWeek {
    return this._dayOfTheWeek
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required")
    }
    if (this._type.length === 0) {
      throw new Error("Type is required")
    }
  }

  changeType(type: string) {
    this._type = type;
  }

  changeDay(day: DayOfTheWeek) {
    this._dayOfTheWeek = day
  }

  activate() {
    if (this._dayOfTheWeek === undefined) {
      throw new Error("Day of the week is mandatory to activate a type of meal")
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  set DayOfTheWeek(dayOfTheWeek: DayOfTheWeek) {
    this._dayOfTheWeek = dayOfTheWeek;
  }
}