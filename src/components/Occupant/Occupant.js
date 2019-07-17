import React, { Component } from 'react';
import OccupantDetail from '../OccupantDetail/OccupantDetail';
import SearchBar from '../SearchBar/SearchBar';
import api from '../../api/api';
import './Occupant.css';

class Occupant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      occupants: []
    };
  }

  componentDidMount = async () => {
    try {
      const response = await api.get('/occupants');
      this.setState({ occupants: response.data }, () => {
        console.log(this.state);
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="apartment">
        <div className="apartment__div">
          <h1 className="apartment__heading">Occupants</h1>
          <SearchBar placeholder="Occupant" />
          <table className="fields" cellSpacing="0" cellPadding="0">
            <thead className="fields__th">
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
              </tr>
            </thead>
            <tbody data-testid="occupant-detail">
              {this.state.occupants.map(occupant => {
                return (
                  <OccupantDetail
                    key={occupant.employeeId}
                    name={occupant.name}
                    employeeId={occupant.employeeId}
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
