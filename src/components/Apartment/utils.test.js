import { calculateVacancy } from "./utils";
import { mockApartment } from "../../mocks/mockData";

describe("Apartments Utils", () => {
  describe("calculateVacancy", () => {
    it("returns vacancy of an apartment based on its capacity and current stays", () => {
      const today = new Date();
      const oneMonthFromToday = today.setMonth(today.getMonth() + 1);
      const twoMonthsFromToday = today.setMonth(today.getMonth() + 2);
      const stays = [
        {
          apartmentId: "123",
          checkInDate: new Date("2017-01-01"),
          checkOutDate: new Date("2017-12-01")
        },
        {
          apartmentId: "123",
          checkInDate: new Date("2018-01-01"),
          checkOutDate: oneMonthFromToday
        },
        {
          apartmentId: "123",
          checkInDate: oneMonthFromToday,
          checkOutDate: twoMonthsFromToday
        }
      ];
      const result = calculateVacancy(mockApartment, stays);

      expect(result).toBe(1);
    });
  });
});
