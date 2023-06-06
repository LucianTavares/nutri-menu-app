import Mixtures from "../../mixture/entity/mixtures";
import TypeOfMeal from "../../type-of-meal/entity/typeOfMeal";

type TodayMenuProps = {
  id: string,
  mixtures: Mixtures[],
  typeOfMeal: TypeOfMeal[],
  userId: string,
  itsFrozen?: boolean,
  active?: boolean,
}

export default class TodayMenu {

  private _id: string;
  private _mixtures: Mixtures[];
  private _userId: string;
  private _typeOfMeal: TypeOfMeal[];
  private _itsFrozen: boolean;
  private _active: boolean;

  constructor(props: TodayMenuProps) {
    this._id = props.id;
    this._mixtures = props.mixtures;
    this._typeOfMeal = props.typeOfMeal;
    this._userId = props.userId;
    this._itsFrozen = props.itsFrozen || false;
    this._active = props.active || false;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._mixtures.length === 0) {
      throw new Error("Mixture is required")
    }
    if (this._typeOfMeal.length === 0) {
      throw new Error("Type of meal is required")
    }
    if (this._userId.length === 0) {
      throw new Error("User Id is required")
    }
  }

  get id(): string {
    return this._id;
  }

  get mixtures(): Mixtures[] {
    return this._mixtures;
  }

  get typeOfMeal(): TypeOfMeal[] {
    return this._typeOfMeal;
  }

  get userId(): string {
    return this._userId
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