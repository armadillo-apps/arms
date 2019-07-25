const extractDate = dateInput => {
  if (dateInput) {
    return dateInput.split("T")[0];
  }
};

export default extractDate;
