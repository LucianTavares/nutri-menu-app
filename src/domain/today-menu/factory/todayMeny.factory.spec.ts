import {v4 as uuid} from 'uuid'
import TodayMenuFactory from './todayMenu.factory'
import TypeOfMeal from '../../type-of-meal/entity/typeOfMeal'
import DayOfTheWeek from '../entity/value-object/dayOfTheWeek'

describe("Today Menu factory unit test", () => {

  it("should create a today menu", async () => {

    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")

    const todayMenuProps = {
      id: uuid(),
      typeOfMeal: [
        {
          id: uuid(),
          type: "Café",
          DayOfTheWeek: dayOfTheWeek
        }
      ],
      mixtures: [
        {
          id: uuid(),
          mixture: "Pão",
        }
      ],
      userId: uuid(),
      itsFrozen: false,
      active: true
    }

    const todayMenu = TodayMenuFactory.create(todayMenuProps)

    expect(todayMenu.id).toBeDefined()
    expect(todayMenu.typeOfMeal.length).toBe(1)
    expect(todayMenu.typeOfMeal[0].DayOfTheWeek.day).toBe("Segunda-Feira")
    expect(todayMenu.typeOfMeal[0].type).toBe("Café")
    expect(todayMenu.mixtures[0].mixture).toBe("Pão")
    expect(todayMenu.userId).toBeDefined()
  })
})