import TodayMenu from "./domain/entity/todayMenu";
import User from "./domain/entity/user";
import Mixtures from "./domain/entity/mixtures";

let user = new User("1", "Lucian", "lucian@fc.com.br");
user.activate();

const mixtureBreakfastOne = new Mixtures("1", "Pão Integral")
const mixtureBreakfastTwo = new Mixtures("2", "Ovos Mexidos")
const mixtureBreakfastThree = new Mixtures("3", "Mamão")
const mixtureBreakfastFour = new Mixtures("4", "Café")

const firstMenu = new TodayMenu("1", [mixtureBreakfastOne, mixtureBreakfastTwo, mixtureBreakfastThree, mixtureBreakfastFour], "1")