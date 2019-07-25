import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import "./ApartmentAssign.css";

const ApartmentAssign = ({
  handleChange,
  filterList,
  handleClick,
  dropdown,
  addNewStay,
  apartmentId,
  occupantToAssign,
  message,
  success
}) => {
  return (
    <React.Fragment>
      <SearchBar
        placeholder="occupants here..."
        id="occupantToAssign"
        handleChange={handleChange}
        value={occupantToAssign}
      />
      {dropdown ? (
        <div>
          <table
            className="apartmentAssignTable"
          >
            <thead>
              <tr className={occupantToAssign ? "visible" : "hidden"}>
                <th>Name</th>
                <th>Remarks</th>
                <th>Employee Id</th>
              </tr>
            </thead>
            <tbody>
              {filterList("occupants", "occupantToAssign").map(
                (person, index) => {
                  return (
                    <tr key={index} className="apartmentAssignTable__row">
                      <td>{person.name}</td>
                      <td>{person.remarks}</td>
                      <td>{person.employeeId}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleClick(
                              apartmentId,
                              person._id,
                              person.name,
                              false
                            )
                          }
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="dateContainer">
          <h2>Check-in</h2>
          <input
            placeholder="Check-in"
            id="checkInDate"
            type="date"
            onChange={handleChange}
          />
            <h2>Check-out</h2>
          <input
            placeholder="Check-out"
            id="checkOutDate"
            type="date"
            onChange={handleChange}
          />
          <div className="dateContainer__buttons">
            <button
              className="modalAssignButton"
              onClick={() => {
                addNewStay();
              }}
            >
              Assign
            </button>
            <button
              className="modalCancelButton"
              onClick={() => {
                handleClick("", "", "", true);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {message ? (
        <ConfirmationMessage message={message} success={success} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ApartmentAssign;
