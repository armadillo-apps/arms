import React, { Component } from "react";
import "./ApartmentProfile.css";
import Lease from "../Lease/Lease";
import ApartmentAssign from "../ApartmentAssign/ApartmentAssign";
import {
  getApartmentProfileHistory,
  createStay,
  removeStay
} from "../../api/api";
import ApartmentAssignModal from "../Modal/ApartmentAssignModal";
import ConfirmationModal from "../Modal/ConfirmationModal";
import moment from "moment";

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
      occupantHistory: [],
      stayToDelete: "",
      isAssignOccupantModalOpen: false,
      isConfirmationModalOpen: false
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

  addStay = async event => {
    try {
      event.preventDefault();
      const response = await createStay(
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

  deleteStay = async () => {
    try {
      const response = await removeStay(this.state.stayToDelete);
      this.setState({ stayToDelete: "", success: true, message: response });
      this.triggerRender();
    } catch (err) {
      this.setState({
        success: false,
        message: "Unable to delete stay from history"
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

  openModal = event => {
    this.setState({ [event.target.id]: true });
  };

  closeModal = id => {
    this.setState({ [id]: false, message: "" });
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
            <div>
              <h2>Remarks</h2>
              <p className="remarks__body">{apartment.remarks}</p>
            </div>
            <div className="apartmentProfile__headerContainer">
              <h2 className="apartmentProfile__header2">Occupants</h2>
              <button
                className="modalAddButton"
                id="isAssignOccupantModalOpen"
                onClick={this.openModal}
              >
                +
              </button>
            </div>

            <div>
              <ApartmentAssignModal
                modalIsOpen={this.state.isAssignOccupantModalOpen}
                closeModal={() => this.closeModal("isAssignOccupantModalOpen")}
                contentLabel="assignOccupantModal"
              >
                <ApartmentAssign
                  handleChange={this.handleChange}
                  checkInDate={this.state.checkInDate}
                  filterList={this.filterList}
                  apartmentId={apartmentId}
                  handleClick={this.handleClick}
                  addStay={this.addStay}
                  occupantToAssign={this.state.occupantToAssign}
                  dropdown={this.state.dropdown}
                  success={this.state.success}
                  message={this.state.message}
                  triggerRender={this.triggerRender}
                />
                <button
                  className="modalCloseButton"
                  onClick={() => this.closeModal("isAssignOccupantModalOpen")}
                >
                  X
                </button>
              </ApartmentAssignModal>
            </div>
            <div>
              <ConfirmationModal
                modalIsOpen={this.state.isConfirmationModalOpen}
                closeModal={() => this.closeModal("isConfirmationModalOpen")}
                deleteStay={this.deleteStay}
                contentLabel="confirmationModal"
                success={this.state.success}
                message={this.state.message}
              />
            </div>

            <table className="apartmentProfile__occupants">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {this.state.occupantHistory.length > 0 ? (
                  this.state.occupantHistory.map((occupant, index) => {
                    const {
                      _id,
                      occupantName,
                      checkInDate,
                      checkOutDate,
                      occupantRemarks
                    } = occupant;

                    return (
                      <tr key={_id}>
                        <td>{occupantName}</td>
                        <td>
                          {moment(new Date(checkInDate)).format("D MMM YY")}
                        </td>
                        <td>
                          {moment(new Date(checkOutDate)).format("D MMM YY")}
                        </td>
                        <td>{occupantRemarks}</td>
                        <td>
                          <button
                            onClick={event => {
                              this.openModal(event);
                              this.setState({ stayToDelete: _id });
                            }}
                            id="isConfirmationModalOpen"
                          >
                            X
                          </button>
                        </td>
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
