import React, { Component } from "react";
import "./ApartmentProfile.css";
import Lease from "../Lease/Lease";
import ApartmentAssign from "../ApartmentAssign/ApartmentAssign";
import { getApartmentProfileHistory, createNewStay } from "../../api/api";
import extractDate from "../../utils/ExtractDate";

class ApartmentProfile extends Component {
  constructor(props) {
    super(props);
    this.apartmentId = this.props.match.params.apartmentId;
    this.state = {
      renderToggle: false,
      occupantToAssign: "",
      occupantId: "",
      apartmentId: "",
      checkInDate: "",
      checkOutDate: "",
      success: false,
      message: "",
      dropdown: true,
      occupantHistory: []
    };
  }

  componentDidMount = async () => {
    try {
      const occupantHistory = await getApartmentProfileHistory(
        this.apartmentId
      );
      this.setState({ occupantHistory });
    } catch (err) {
      return err.message;
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.renderToggle !== prevState.renderToggle) {
      try {
        const occupantHistory = await getApartmentProfileHistory(
          this.apartmentId
        );
        this.setState({ occupantHistory });
      } catch (err) {
        return err.message;
      }
    }
  };

  triggerRender = () => {
    this.setState(prev => {
      return {
        renderToggle: !prev.renderToggle
      };
    });
  };

  addNewStay = async () => {
    try {
      const response = await createNewStay(
        this.state.occupantId,
        this.state.apartmentId,
        this.state.checkInDate,
        this.state.checkOutDate
      );
      this.setState({
        apartmentId: "",
        occupantId: "",
        occupantToAssign: "",
        dropdown: true,
        success: true,
        message: response,
        checkInDate: "",
        checkOutDate: ""
      });
      this.triggerRender();
    } catch (err) {
      this.setState({
        success: false,
        message: "Unable to assign occupant to apartment"
      });
    }
  };

  filterList = (list, item) => {
    if (this.state[item]) {
      return this.props[list].filter(element =>
        element.name.toLowerCase().includes(this.state[item].toLowerCase())
      );
    } else {
      return [];
    }
  };
  
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleClick = (apartmentId, occupantId, occupantName, flag) => {
    this.setState({
      apartmentId,
      occupantId,
      occupantToAssign: occupantName,
      dropdown: flag,
      checkInDate: "",
      checkOutDate: ""
    });
  };

  render() {
    const apartmentId = this.props.match.params.apartmentId;
    if (!this.props.apartments || this.props.apartments.length < 1) {
      return <h1>Loading...</h1>;
    } else {
      const apartment = this.props.apartments.find(apartment => {
        return apartment._id === this.apartmentId;
      });
      return (
        <div className="apartmentProfileContainer">
          <div className="apartmentProfile">
            <div
              className="apartmentProfile__backButton"
              onClick={() => this.props.history.goBack()}
            >
              &lt; Back
            </div>
            <h1 className="apartmentProfile__heading">{apartment.name}</h1>
            <div className="apartmentProfile__details">
              <div className="occupantsNumber">
                <h2>No. of Occupants</h2>
                <p>0</p>
              </div>
              <div className="capacity">
                <h2>Capacity</h2>
                <p>{apartment.capacity}</p>
              </div>
              <div className="address">
                <h2>Address</h2>
                <p>{apartment.address}</p>
              </div>
              <div className="bedrooms">
                <h2>Bedrooms</h2>
                <p>{apartment.bedrooms}</p>
              </div>
            </div>
            <h2 className="apartmentProfile__header2">Occupants</h2>
            <ApartmentAssign
              handleChange={this.handleChange}
              filterList={this.filterList}
              apartmentId={apartmentId}
              handleClick={this.handleClick}
              addNewStay={this.addNewStay}
              occupantToAssign={this.state.occupantToAssign}
              dropdown={this.state.dropdown}
              success={this.state.success}
              message={this.state.message}
              triggerRender={this.triggerRender}
            />
            <table className="apartmentProfile__occupants">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                </tr>
              </thead>
              <tbody>
                {this.state.occupantHistory.length > 0 ? (
                  this.state.occupantHistory.map(occupant => {
                    const {
                      _id,
                      occupantName,
                      checkInDate,
                      checkOutDate
                    } = occupant;
                    return (
                      <tr key={_id}>
                        <td>{occupantName}</td>
                        <td>{extractDate(checkInDate)}</td>
                        <td>{extractDate(checkOutDate)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No occupants yet!</td>
                  </tr>
                )}
              </tbody>
            </table>
            <h2 className="apartmentProfile__header2">Leases</h2>
            <table className="apartmentProfile__leases">
              <thead>
                <tr>
                  <th>Lease Start</th>
                  <th>Lease End</th>
                  <th>Monthly Rent</th>
                </tr>
              </thead>
              <tbody>
                {apartment.leases.length > 0 ? (
                  apartment.leases.map(lease => (
                    <Lease key={lease._id} leaseInfo={lease} />
                  ))
                ) : (
                  <tr>No Leases yet!</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default ApartmentProfile;
