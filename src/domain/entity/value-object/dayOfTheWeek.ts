export default class DayOfTheWeek {

  _day: string;
  _active: boolean = false;

  constructor(day: string) {

    this._day = day;
    this.validate();
  }

  get day(): string {
    return this._day;
  }

  changeDay(day: string) {
    this._day = day;
  }

  validate() {
    if (this._day.length === 0) {
      throw new Error("Day is required");
    }
  }

}