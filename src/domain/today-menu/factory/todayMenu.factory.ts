import Mixture from "../../mixture/entity/mixture"
import TypeOfMeal from "../../type-of-meal/entity/typeOfMeal"
import TodayMenu from "../entity/todayMenu"
import DayOfTheWeek from "../entity/value-object/dayOfTheWeek"

interface TodayMenuFactoryProps {
  id: string
  mixtures: {
    id: string
    mixture: string
  }[]
  typeOfMeal: {
    id: string
    type: string
    DayOfTheWeek: DayOfTheWeek
  }[]
  userId: string
  itsFrozen: boolean
  active: boolean
}

export default class TodayMenuFactory {

  public static create(props: TodayMenuFactoryProps): TodayMenu {

    const mixture = props.mixtures.map((m) => {
      return new Mixture(
        m.id,
        m.mixture
      )
    })


    const typeOfMeal = props.typeOfMeal.map((t) => {
      const type =  new TypeOfMeal(
        t.id,
        t.type
      )
      type.changeDay(t.DayOfTheWeek)
      return type
    })

    return new TodayMenu({ id: props.id, mixtures: mixture,  typeOfMeal: typeOfMeal, userId: props.userId, itsFrozen: props.itsFrozen, active: props.active })

  }
}