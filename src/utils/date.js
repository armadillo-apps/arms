import moment from "moment";

export const formatDate = date => {
  return moment(new Date(date)).format("D MMM YY");
};
