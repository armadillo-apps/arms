export const compareStrings = (str1, str2) =>
  str1.toLowerCase().includes(str2.toLowerCase());

export const isEmpty = object => {
  return Object.keys(object).length === 0;
};
