import TodayMenu from "../../today-menu/entity/todayMenu";
import UserInterface from "./user.interface";


export default class User implements UserInterface {

  private _id: string;
  private _name: string;
  private _email: string;
  private _todayMenu: TodayMenu[];
  private _active: boolean = false;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get todayMenu(): TodayMenu[] {
    return this._todayMenu;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeEmail(email: string) {
    this._email = email;
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