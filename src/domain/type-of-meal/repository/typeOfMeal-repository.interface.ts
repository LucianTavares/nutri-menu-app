
import RepositoryInterface from "../../@shared/repository/repository-interface";
import TypeOfMeal from "../entity/typeOfMeal";

export default interface TypeOfMealRepositoryInterface extends RepositoryInterface<TypeOfMeal> {

  findByType(type: string): Promise<TypeOfMeal> 
}