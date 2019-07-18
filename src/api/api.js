import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_URL
});

export const createNewOccupant = async (name, employeeId, remarks) => {
  const requestBody = {
    name: name,
    employeeId: employeeId,
    remarks: remarks
  };
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/occupants`,
    requestBody
  );
  return response;
};
