export default class Mixtures {

  _id: string;
  _mixture: string;
  _canFreeze: boolean = false;
  _active: boolean = false;

  constructor(id: string, mixture: string, canFreeze: boolean) {

    this._id = id;
    this._mixture = mixture;
    this._canFreeze = canFreeze;
    this.validate();
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
    this._canFreeze = true;
  }

  cannotFreeze() {
    this._canFreeze = false;
  }

  activate() {
    this._active = true;  
  }

  deactivate() {
    this._active = false;
  }

}