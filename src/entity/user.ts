export default class User {

  _id: string;
  _name: string;
  _email: string;
  _active: boolean = false;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeEmail(email: string) {
    this._email = email;
  }

  activate() {
    this._active = true;  
  }

  deactivate() {
    this._active = false;
  }

}