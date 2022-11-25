import DayOfTheWeek from "./entity/dayOfTheWeek";
import TodayMenu from "./entity/todayMenu";
import TypeOfMeal from "./entity/typeOfMeal";
import User from "./entity/user";
import Mixtures from "./entity/mixtures";


let user = new User("1", "Lucian", "lucian@fc.com.br");
user.activate();

const monday = new DayOfTheWeek("1", "Segunda-Feira");
const typeOfMealBreakfast = new TypeOfMeal("1", "Café da Manhã", "1")

const mixtureBreakfastOne = new Mixtures("1", "Pão Integral", false)
const mixtureBreakfastTwo = new Mixtures("2", "Ovos Mexidos", false)
const mixtureBreakfastThree = new Mixtures("3", "Mamão", false)
const mixtureBreakfastFour = new Mixtures("4", "Café", false)


const firstMenu = new TodayMenu("1", [mixtureBreakfastOne, mixtureBreakfastTwo, mixtureBreakfastThree, mixtureBreakfastFour], "1", "1", false)