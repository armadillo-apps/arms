import axios from "axios";

export default axios.create({
  baseURL: "https://my-json-server.typicode.com/armadillo-apps/api"
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
  return response.data;
};
