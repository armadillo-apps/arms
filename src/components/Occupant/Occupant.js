import React, { Component } from "react";
import OccupantDetail from "../OccupantDetail/OccupantDetail";
import SearchBar from "../SearchBar/SearchBar";
import { fetchOccupants } from "../../api/api";
import "./Occupant.css";

class Occupant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupants: []
    };
  }

  componentDidMount = async () => {
    try {
      const occupants = await fetchOccupants();
      this.setState({ occupants });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="occupants" data-testid="occupants">
        <div className="occupants__div">
          <h1 className="occupants__heading">Occupants</h1>
          <SearchBar placeholder="Occupant" />
          <table className="fields" cellSpacing="0" cellPadding="0">
            <thead className="fields__th">
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.occupants.map(occupant => {
                return (
                  <OccupantDetail
                    key={occupant.employeeId}
                    name={occupant.name}
                    employeeId={occupant.employeeId}
                    history={this.props.history}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Occupant;
