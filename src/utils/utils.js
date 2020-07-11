import moment from "moment";

export const compareStrings = (str1, str2) =>
  str1.toLowerCase().includes(str2.toLowerCase());

export const isEmpty = objectOrArray => {
  return Object.keys(objectOrArray ?? {}).length === 0;
};

export const formatDate = date => moment(new Date(date)).format("D MMM YY");
