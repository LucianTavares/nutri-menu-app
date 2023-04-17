export default class Mixtures {

  _id: string;
  _mixture: string;
  _canFreeze: boolean = false;
  _active: boolean = false;

  constructor(id: string, mixture: string) {

    this._id = id;
    this._mixture = mixture;
    this.isFreeze()
    this.isActive()
    this.validate();
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