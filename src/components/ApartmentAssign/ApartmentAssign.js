import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import "./ApartmentAssign.css";

const ApartmentAssign = ({
  handleChange,
  checkInDate,
  filterList,
  handleClick,
  dropdown,
  addStay,
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
          <table className="apartmentAssignTable">
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
        <form className="dateContainer" onSubmit={addStay}>
          <h2>Check-in</h2>
          <input
            placeholder="Check-in"
            id="checkInDate"
            type="date"
            required={true}
            onChange={handleChange}
          />
          <h2>Check-out</h2>
          <input
            placeholder="Check-out"
            id="checkOutDate"
            type="date"
            min={checkInDate}
            required={true}
            onChange={handleChange}
          />
          <div className="dateContainer__buttons">
            <input className="modalAssignButton" value="Assign" type="submit" />
            <button
              className="modalCancelButton"
              onClick={() => {
                handleClick("", "", "", true);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
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
