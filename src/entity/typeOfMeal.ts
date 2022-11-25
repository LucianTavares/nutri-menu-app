export default class TypeOfMeal {

  _id: string;
  _type: string;
  _dayOfTheWeekId: string;
  _active: boolean = false;

  constructor(id: string, type: string, dayOfTheWeekId: string) {

    this._id = id;
    this._type = type;
    this._dayOfTheWeekId = dayOfTheWeekId;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required")
    }
    if (this._type.length === 0) {
      throw new Error("Type is required")
    }
    if (this._dayOfTheWeekId.length === 0) {
      throw new Error("Day of the week is required")
    }
  }

  changeType(type: string) {
    this._type = type;
  }

  changeDayOfTheWeek(dayOfTheWeekId: string) {
    this._dayOfTheWeekId = dayOfTheWeekId;
  }

  activate() {
    this._active = true;  
  }

  deactivate() {
    this._active = false;
  }
}