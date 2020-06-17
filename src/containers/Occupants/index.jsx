import React, { useEffect, useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./index.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { fetchOccupants } from "../../api/api";
import { useHistory } from "react-router-dom";
import OccupantDetail from "./OccupantDetail";

const Occupants = () => {
  const history = useHistory();
  const [filteredOccupants, setFilteredOccupants] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { data: occupants } = useFetch(fetchOccupants);

  useEffect(() => {
    if (occupants?.length > 0) {
      const sortedOccupants = occupants?.reduce(
        (accumulator, occupant) => {
          switch (occupant.status) {
            case "inactive":
              accumulator.inactive.push(occupant);
              return accumulator;
            case "unallocated":
              accumulator.unallocated.push(occupant);
              return accumulator;
            case "allocated":
              accumulator.allocated.push(occupant);
              return accumulator;
            default:
              return accumulator;
          }
        },
        { inactive: [], unallocated: [], allocated: [] }
      );
      const sortedOccupantsArray = [
        ...sortedOccupants.unallocated,
        ...sortedOccupants.allocated,
        ...sortedOccupants.inactive
      ];
      setFilteredOccupants(sortedOccupantsArray);
    }
  }, [occupants]);

  const handleNewInput = event => {
    setInputValue(event.target.value);
  };

  const handleOccupantSearch = () => {
    if (inputValue) {
      return filteredOccupants.filter(occupant => {
        return occupant.name.toLowerCase().includes(inputValue.toLowerCase());
      });
    } else {
      return filteredOccupants;
    }
  };

  return (
    <div className={styles.container} data-testid="occupants">
      <div className={styles.occupantsList}>
        <h1 className={styles.heading1}>Occupants</h1>
        <SearchBar handleChange={handleNewInput} placeholder="Occupant" />
        <table className={styles.table} cellSpacing="0" cellPadding="0">
          <thead className={styles.heading2}>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Remarks</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {handleOccupantSearch().map(occupant => {
              return (
                <OccupantDetail
                  key={occupant._id}
                  name={occupant.name}
                  occupantId={occupant._id}
                  employeeId={occupant.employeeId}
                  remarks={occupant.remarks}
                  status={occupant.status}
                  history={history}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Occupants;