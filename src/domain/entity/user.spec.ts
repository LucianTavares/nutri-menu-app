import Mixtures from "./mixtures";
import TodayMenu from "./todayMenu";
import TypeOfMeal from "./typeOfMeal";
import User from "./user";
import DayOfTheWeek from "./value-object/dayOfTheWeek";

describe("User unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      const mixture = new Mixtures("1", "Frango");
      const todayMenu = new TodayMenu("1", [mixture], "1")
      let user = new User("", "Lucian", "lucian@fs.com.br", [todayMenu]);

    }).toThrowError("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      const mixture = new Mixtures("1", "Frango");
      const todayMenu = new TodayMenu("1", [mixture], "1")
      let user = new User("1", "", "lucian@fs.com.br", [todayMenu]);

    }).toThrowError("Name is required");
  })

  it("should throw error when email is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      const mixture = new Mixtures("1", "Frango");
      const todayMenu = new TodayMenu("1", [mixture], "1")
      let user = new User("1", "Lucian", "", [todayMenu]);

    }).toThrowError("Email is required");
  })

  it("should throw error when today menu is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      let user = new User("1", "Lucian", "lucian@fs.com.br", []);

    }).toThrowError("Today Menu is required");
  })

  it("should change name", () => {
    const typeOfMeal = new TypeOfMeal("1", "Almoço")
    const day = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = day
    const mixture = new Mixtures("1", "Frango");
    const todayMenu = new TodayMenu("1", [mixture], "1")
    let user = new User("1", "Lucian", "lucian@fs.com.br", [todayMenu]);
    user.changeName("Lucian Tavares");

    expect(user.name).toBe("Lucian Tavares");
  })

  it("should change email", () => {
    const typeOfMeal = new TypeOfMeal("1", "Almoço")
    const day = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = day
    const mixture = new Mixtures("1", "Frango");
    const todayMenu = new TodayMenu("1", [mixture], "1")
    let user = new User("1", "Lucian", "lucian@fs.com.br", [todayMenu]);
    user.changeEmail("lucian@fullc.com.br");

    expect(user.email).toBe("lucian@fullc.com.br");
  })

  it("should activate user", () => {
    const typeOfMeal = new TypeOfMeal("1", "Almoço")
    const day = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = day
    const mixture = new Mixtures("1", "Frango");
    const todayMenu = new TodayMenu("1", [mixture], "1")
    let user = new User("1", "Lucian", "lucian@fs.com.br", [todayMenu]);
    user.activate();

    expect(user.isActive()).toBe(true);
  })

  it("should deactivate user", () => {
    const typeOfMeal = new TypeOfMeal("1", "Almoço")
    const day = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = day
    const mixture = new Mixtures("1", "Frango");
    const todayMenu = new TodayMenu("1", [mixture], "1")
    let user = new User("1", "Lucian", "lucian@fs.com.br", [todayMenu]);
    user.deactivate();

    expect(user.isActive()).toBe(false);
  })

  it("should throw error when try activate user when id is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      const mixture = new Mixtures("1", "Frango");
      const todayMenu = new TodayMenu("1", [mixture], "1")
      let user = new User("", "Lucian", "lucian@fs.com.br", [todayMenu]);
      user.activate();
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate user when name is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      const mixture = new Mixtures("1", "Frango");
      const todayMenu = new TodayMenu("1", [mixture], "1")
      let user = new User("1", "", "lucian@fs.com.br", [todayMenu]);
      user.activate();
    }).toThrowError("Name is required")
  })

  it("should throw error when try activate user when email is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      const mixture = new Mixtures("1", "Frango");
      const todayMenu = new TodayMenu("1", [mixture], "1")
      let user = new User("1", "Lucian", "", [todayMenu]);
      user.activate();
    }).toThrowError("Email is required")
  })

  it("should throw error when try activate user when Today Menu is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Almoço")
      const day = new DayOfTheWeek("Segunda-Feira")
      typeOfMeal.DayOfTheWeek = day
      const mixture = new Mixtures("1", "Frango");
      const todayMenu = new TodayMenu("1", [mixture], "1")
      let user = new User("1", "Lucian", "lucian@fs.com.br", []);
      user.activate();
    }).toThrowError("Today Menu is required")
  })
});