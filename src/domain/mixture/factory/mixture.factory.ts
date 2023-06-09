import MixtureInterface from "../entity/mixture.interface";
import Mixture from "../entity/mixture";
import {v4 as uuid} from 'uuid'

export default class MixtureFactory {
  
  public static create(mixture: string): MixtureInterface {
    return new Mixture(uuid(), mixture)
  }
}