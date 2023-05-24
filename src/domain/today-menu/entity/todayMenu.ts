import DayOfTheWeek from "./value-object/dayOfTheWeek";
import Mixtures from "./mixtures";

export default class TodayMenu {

  private _id: string;
  private _mixtures: Mixtures[];
  // _dayOfTheWeek!: DayOfTheWeek;
  private _typeOfMealId: string;
  private _itsFrozen: boolean = false;
  private _active: boolean = false;

  constructor(id: string, mixtures: Mixtures[], typeOfMealId: string) {
    this._id = id;
    this._mixtures = mixtures;
    this._typeOfMealId = typeOfMealId;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._mixtures.length === 0) {
      throw new Error("Mixture is required")
    }
    if (this._typeOfMealId.length === 0) {
      throw new Error("Type of meal id is required")
    }
  }

  get id(): string {
    return this._id;
  }

  get mixtures(): Mixtures[] {
    return this._mixtures;
  }

  get typeOfMealId(): string {
    return this._typeOfMealId;
  }

  freeze() {
    this._itsFrozen = true;
  }

  unfreeze() {
    this._itsFrozen = false;
  }

  isFrozen(): boolean {
    return this._itsFrozen
  }

  activate() {
    this._active = true;  
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

}