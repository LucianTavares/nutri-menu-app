import MixtureInterface from "./mixture.interface";

type MixtureProps = {
  id: string
  mixture: string
  canFreeze?: boolean;
  active?: boolean;
}

export default class Mixture implements MixtureInterface {

  private _id: string;
  private _mixture: string;
  private _canFreeze: boolean;
  private _active: boolean;

  constructor(props: MixtureProps) {

    this._id = props.id;
    this._mixture = props.mixture;
    this._canFreeze = props.canFreeze || false;
    this._active = props.active || false;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get mixture(): string {
    return this._mixture;
  }

  changeMixture(mixture: string) {
    this._mixture = mixture;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._mixture.length === 0) {
      throw new Error("Mixture is required");
    }
  }

  canFreeze() {
    this._canFreeze = true
  }

  cannotFreeze() {
    this._canFreeze = false;
  }

  isFreeze(): boolean {
    return this._canFreeze
  }

  activate() {
    this._active = true;  
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active
  }

}