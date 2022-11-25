import Mixtures from "./mixtures";

export default class TodayMenu {

  _id: string;
  _mixtures: Mixtures[];
  _dayOfTheWeekId: string;
  _typeOfMealId: string;
  _itsFrozen?: boolean = false;
  _active: boolean = false;

  constructor(id: string, mixtures: Mixtures[], dayOfTheWeekId: string, typeOfMealId: string, itsFrozen: boolean) {
    this._id = id;
    this._mixtures = mixtures;
    this._dayOfTheWeekId = dayOfTheWeekId;
    this._typeOfMealId = typeOfMealId;
    this._itsFrozen = itsFrozen;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  freeze() {
    this._itsFrozen = true;
  }

  unfreeze() {
    this._itsFrozen = false;
  }

  activate() {
    this._active = true;  
  }

  deactivate() {
    this._active = false;
  }

}