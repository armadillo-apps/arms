import extractDate from "./ExtractDate";
import moment from "moment";

// Todo: Write Test
export const checkLeaseExpiry = leaseEnd => {
  const leaseEndDate = new Date(extractDate(leaseEnd));
  const today = new Date(Date.now());

  const monthBeforeLeaseEnd = moment(leaseEndDate)
    .subtract(1, "months")
    .format("YYYY-MM-DD");

  return moment(today).isBetween(monthBeforeLeaseEnd, leaseEndDate);
};
