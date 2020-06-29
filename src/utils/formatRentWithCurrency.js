import { sgdFormatter, thbFormatter } from "./formatMoney";

export const formatRentWithCurrency = (rent, currency) => {
  if (currency === "SGD") {
    return sgdFormatter.format(rent);
  } else if (currency === "THB") {
    return thbFormatter.format(rent);
  }
};
