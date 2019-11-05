const extractDate = dateInput => {
  if (dateInput) {
    return dateInput.split("T")[0];
  } else {
    return "Require Date Input";
  }
};

export default extractDate;
