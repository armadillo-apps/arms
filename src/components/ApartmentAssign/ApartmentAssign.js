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
  success,
}) => {
  return (
    <React.Fragment>
      <SearchBar
        placeholder="occupants here..."
        id="occupantToAssign"
        handleChange={handleChange}
        value={occupantToAssign}
        width="325px"
      />
      {dropdown ? (
        <div>
          <table className="apartmentAssignTable" cellSpacing="0" cellPadding="0">
            <tbody>
              {filterList("occupants", "occupantToAssign").map(
                (person, index) => {
                  return (
                    <tr key={index} className="apartmentAssignTable__row">
                      <td>{person.name}</td>
                      <td>{person.employeeId}</td>
                      <td>{person.remarks}</td>
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
                          +
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
        <div>
          Check-in:
          <input
            placeholder="Check-in"
            id="checkInDate"
            type="date"
            onChange={handleChange}
          />
          Check-out:
          <input
            placeholder="Check-out"
            id="checkOutDate"
            type="date"
            onChange={handleChange}
          />
          <button
            onClick={() => {addNewStay()}}
          >
            Add
          </button>
          <button
            onClick={() => {
              handleClick("", "", "", true);
            }}
          >
            Cancel
          </button>
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
