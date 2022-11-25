export default class DayOfTheWeek {

  _id: string;
  _day: string;
  _active: boolean = false;

  constructor(id: string, day: string) {

    this._id = id;
    this._day = day;
    this.validate();
  }

  changeDay(day: string) {
    this._day = day;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._day.length === 0) {
      throw new Error("Day is required");
    }
  }

  activate() {
    this._active = true;  
  }

  deactivate() {
    this._active = false;
  }

}