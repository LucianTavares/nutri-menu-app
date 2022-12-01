export default class User {

  private _id: string;
  private _name: string;
  private _email: string;
  private _active: boolean = false;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._email.length === 0) {
      throw new Error("Email is required")
    }
  }

  changeEmail(email: string) {
    this._email = email;
    this.validate();
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