import DayOfTheWeek from "./dayOfTheWeek";

export default class TypeOfMeal {

  _id: string;
  _type: string;
  _dayOfTheWeek!: DayOfTheWeek;
  _active: boolean = false;

  constructor(id: string, type: string) {

    this._id = id;
    this._type = type;
    this.validate();
  }

  get type(): string {
    return this._type;
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

  // changeDayOfTheWeek(dayOfTheWeek: DayOfTheWeek) {
  //   this._dayOfTheWeek = dayOfTheWeek;
  // }

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