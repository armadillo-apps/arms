import React, { Component } from "react";
import moment from "moment";
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
import EditApartmentModal from "../Modal/EditApartmentModal";
import EditApartmentForm from "../EditApartmentForm/EditApartmentForm";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import extractDate from "../../utils/ExtractDate";

class ApartmentProfile extends Component {
  constructor(props) {
    super(props);
    this.apartmentId = this.props.match.params.apartmentId;
    this.today = new Date();
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
      isConfirmationModalOpen: false,
      isEditApartmentModalOpen: false,
      currentOccupants: [],
      futureOccupants: [],
      pastOccupants: [],
      status: ""
    };
  }

  componentDidMount = async () => {
    try {
      const occupantHistory = await getApartmentProfileHistory(
        this.apartmentId
      );
      this.setState({ occupantHistory });
      this.organiseOccupants();
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
        this.organiseOccupants();
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
    this.props.getAllStays();
  };

  selectLeaseByDates = async (checkInDate, checkOutDate) => {
    if (this.props.apartments.length > 0) {
      const thisApartment = await this.props.apartments.find(apartment => {
        return apartment._id === this.apartmentId;
      });
      const [foundLease] = thisApartment.leases.filter(lease => {
        return (
          moment(new Date(lease.leaseEnd)).isSameOrAfter(checkOutDate, "day") &&
          moment(new Date(lease.leaseStart)).isSameOrBefore(checkInDate, "day")
        );
      });
      if (foundLease) {
        return foundLease._id;
      }
    }
  };

  findSpecificApartment = () => {
    if (this.props.apartments.length > 0) {
      const thisApartment = this.props.apartments.find(apartment => {
        return apartment._id === this.apartmentId;
      });
      return thisApartment;
    }
  };

  checkLeaseEnd = () => {
    const thisApartment = this.findSpecificApartment();
    const formattedLeaseEndDate = new Date(
      extractDate(thisApartment.leases[0].leaseEnd)
    );
    const monthBeforeLeaseEnd = moment(formattedLeaseEndDate)
      .subtract(1, "months")
      .format("YYYY-MM-DD");
    const leaseEndAlert = moment(this.today).isBetween(
      monthBeforeLeaseEnd,
      formattedLeaseEndDate
    );
    return leaseEndAlert ? "leaseEndAlert" : "";
  };

  addStay = async event => {
    try {
      event.preventDefault();
      const leaseId = await this.selectLeaseByDates(
        this.state.checkInDate,
        this.state.checkOutDate
      );
      if (leaseId) {
        const response = await createStay(
          this.state.occupantId,
          this.state.apartmentId,
          this.state.checkInDate,
          this.state.checkOutDate,
          leaseId
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
      } else {
        throw new Error("- No lease found for the selected dates");
      }
    } catch (err) {
      this.setState({
        success: false,
        message: `Unable to assign occupant to apartment ${err.message}`
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

  organiseOccupants = () => {
    this.setState({
      currentOccupants: this.sortOccupants(this.getCurrentOccupants()),
      futureOccupants: this.sortOccupants(this.getFutureOccupants()),
      pastOccupants: this.sortOccupants(this.getPastOccupants())
    });
  };

  getCurrentOccupants = () => {
    return this.state.occupantHistory
      .filter(stay => {
        return (
          moment(this.today).isSameOrAfter(new Date(stay.checkInDate), "day") &&
          moment(this.today).isSameOrBefore(new Date(stay.checkOutDate), "day")
        );
      })
      .map(stay => {
        return { ...stay, className: "currentOccupants" };
      });
  };

  getFutureOccupants = () => {
    return this.state.occupantHistory
      .filter(stay => {
        return moment(this.today).isBefore(new Date(stay.checkInDate), "day");
      })
      .map(stay => {
        return { ...stay, className: "futureOccupants" };
      });
  };

  getPastOccupants = () => {
    return this.state.occupantHistory
      .filter(stay => {
        return moment(this.today).isAfter(new Date(stay.checkOutDate), "day");
      })
      .map(stay => {
        return { ...stay, className: "pastOccupants" };
      });
  };

  sortOccupants = array => {
    return array.sort((beforeDate, afterDate) => {
      if (
        moment(new Date(beforeDate.checkOutDate)).isSame(
          new Date(afterDate.checkOutDate)
        )
      ) {
        if (
          moment(new Date(beforeDate.checkInDate)).isBefore(
            new Date(afterDate.checkInDate)
          )
        ) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (
          moment(new Date(beforeDate.checkOutDate)).isBefore(
            new Date(afterDate.checkOutDate)
          )
        ) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  };

  render() {
    const apartmentId = this.props.match.params.apartmentId;
    if (!this.props.apartments || this.props.apartments.length < 1) {
      return <h1>Loading...</h1>;
    } else {
      let apartment = this.props.apartments.find(apartment => {
        return apartment._id === this.apartmentId;
      });
      if (!apartment) {
        return (
          <div className="apartmentProfileContainer">
            <div className="apartmentProfile" />
            <h1 className="apartmentProfile__heading">
              Could not find apartment
            </h1>
          </div>
        );
      }

      return (
        <div className="apartmentProfileContainer">
          <div className="apartmentProfile">
            <div
              className="apartmentProfile__backButton"
              onClick={() => this.props.history.goBack()}
            >
              &lt; Back to Apartment Listings
            </div>
            <div className="apartmentProfile__headingContainer">
              <h1 className="apartmentProfile__heading">{apartment.name}</h1>
              <span
                className={`apartmentProfile__status ${this.checkLeaseEnd()} ${
                  apartment.status
                }`}
              >
                {apartment.status}
              </span>
              <button
                id="isEditApartmentModalOpen"
                className="apartmentProfile__editDetailsButton"
                onClick={event => {
                  this.openModal(event);
                  this.props.clearConfirmationMessage();
                }}
              >
                Edit
              </button>
            </div>

            <div className="apartmentProfile__details">
              <div className="apartmentProfile__spaceDetails">
                <div className="occupantsNumber">
                  <h2>No. of Occupants</h2>
                  <p data-testid="occupantsCount">
                    {this.state.currentOccupants.length}
                  </p>
                </div>
                <div className="capacity">
                  <h2>Capacity</h2>
                  <p>{apartment.capacity}</p>
                </div>
                <div className="bedrooms">
                  <h2>Bedrooms</h2>
                  <p>{apartment.bedrooms}</p>
                </div>
              </div>
              <div className="apartmentProfile__locationDetails">
                <div className="address">
                  <h2>Address</h2>
                  <p>{apartment.address}</p>
                </div>
                <div className="country">
                  <h2>Country</h2>
                  <p>{apartment.country}</p>
                </div>
              </div>
              <div className="apartmentProfile__landlordDetails">
                <div className="landlord">
                  <h2>Landlord Name</h2>
                  <p>{apartment.landlord.name}</p>
                </div>
                <div className="landlordAccount">
                  <h2>Landlord A/C No</h2>
                  <p>{apartment.landlord.accountNumber}</p>
                </div>
              </div>
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
                  [
                    ...this.state.futureOccupants,
                    ...this.state.currentOccupants,
                    ...this.state.pastOccupants
                  ].map(occupant => {
                    const {
                      _id,
                      occupantName,
                      checkInDate,
                      checkOutDate,
                      occupantRemarks,
                      className
                    } = occupant;

                    return (
                      <tr
                        key={_id}
                        className={className}
                        data-testid="tableRow"
                      >
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
            <div className="apartmentProfile__bottomGrid">
              <div>
                <h2 className="apartmentProfile__header2">Leases</h2>
                <table
                  className={`apartmentProfile__leases ${this.checkLeaseEnd()}`}
                >
                  <thead>
                    <tr>
                      <th>Lease Start</th>
                      <th>Lease End</th>
                      <th>Monthly Rent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apartment.leases.map(lease => (
                      <Lease key={lease._id} leaseInfo={lease} />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="apartmentProfile__remarks">
                <h2 className="apartmentProfile__header2">Remarks</h2>
                <p>{apartment.remarks}</p>
              </div>
            </div>
            <div>
              <EditApartmentModal
                isModalOpen={this.state.isEditApartmentModalOpen}
                closeModal={() => this.closeModal("isEditApartmentModalOpen")}
              >
                {this.props.editApartmentModal.success ? (
                  <div>
                    <ConfirmationMessage
                      success={this.props.editApartmentModal.success}
                      message={this.props.editApartmentModal.message}
                    />
                    <button
                      onClick={() =>
                        this.closeModal("isEditApartmentModalOpen")
                      }
                      className="editApartmentForm__closeButton"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <EditApartmentForm
                    closeModal={() =>
                      this.closeModal("isEditApartmentModalOpen")
                    }
                    apartment={apartment}
                    currentOccupants={this.state.currentOccupants}
                    futureOccupants={this.state.futureOccupants}
                    onSubmit={this.props.onSubmit}
                    success={this.props.editApartmentModal.success}
                    message={this.props.editApartmentModal.message}
                  />
                )}
              </EditApartmentModal>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ApartmentProfile;
