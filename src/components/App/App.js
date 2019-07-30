import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { fetchOccupants, fetchApartments, updateOccupant } from "../../api/api";
import SideBar from "../SideBar/SideBar";
import Apartment from "../Apartment/Apartment";
import Occupant from "../Occupant/Occupant";
import NewOccupantForm from "../NewOccupantForm/NewOccupantForm";
import NewApartmentForm from "../NewApartmentForm/NewApartmentForm";
import OccupantProfile from "../OccupantProfile/OccupantProfile";
import ApartmentProfile from "../ApartmentProfile/ApartmentProfile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: [],
      occupants: [],
      editOccupantModal: {
        isModalOpen: false,
        name: "",
        employeeId: "",
        gender: "",
        remarks: "",
        country: "",
        status: "",
        message: "",
        success: false
      },
      renderToggle: false
    };
  }

  componentDidMount = async () => {
    try {
      const apartments = await fetchApartments();
      this.setState({ apartments });
      const occupants = await fetchOccupants();
      this.setState({ occupants });
    } catch (err) {
      return err.message;
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.renderToggle !== prevState.renderToggle) {
      try {
        const apartments = await fetchApartments();
        this.setState({ apartments });
        const occupants = await fetchOccupants();
        this.setState({ occupants });
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

  openEditOccupantModal = (id, occupant) => {
    const {
      _id,
      name,
      employeeId,
      gender,
      country,
      remarks,
      status
    } = occupant;
    this.setState({
      [id]: {
        _id,
        name,
        employeeId,
        gender,
        country,
        remarks,
        status,
        isModalOpen: true
      }
    });
  };

  closeModal = id => {
    this.setState({
      [id]: {
        isModalOpen: false,
        message: ""
      }
    });
  };

  onEditOccupantFormChange = event => {
    this.setState({
      editOccupantModal: {
        ...this.state.editOccupantModal,
        [event.target.id]: event.target.value
      }
    });
  };

  onEditOccupantFormSubmit = async event => {
    try {
      event.preventDefault();
      const {
        _id,
        name,
        employeeId,
        gender,
        remarks,
        country,
        status
      } = this.state.editOccupantModal;
      const response = await updateOccupant(
        _id,
        name,
        employeeId,
        gender,
        remarks,
        country,
        status
      );
      const occupants = await fetchOccupants();
      this.setState({
        occupants,
        editOccupantModal: {
          ...this.state.editOccupantModal,
          name: "",
          employeeId: "",
          gender: "",
          remarks: "",
          country: "",
          status: "",
          message: response,
          success: true
        }
      });
    } catch (err) {
      this.setState({
        editOccupantModal: {
          isModalOpen: true,
          success: false,
          message: "Unable to update occupant"
        }
      });
    }
  };

  render() {
    return (
      <section className="app">
        <Router>
          <SideBar />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Apartment apartments={this.state.apartments} {...props} />
              )}
            />
            <Route
              exact
              path="/occupants"
              render={props => (
                <Occupant occupants={this.state.occupants} {...props} />
              )}
            />
            <Route
              path="/apartments/:apartmentId"
              render={props => (
                <ApartmentProfile
                  apartments={this.state.apartments}
                  occupants={this.state.occupants}
                  {...props}
                  apartmentAssignModal={this.state.apartmentAssignModal}
                  confirmationModal={this.state.confirmationModal}
                />
              )}
            />
            <Route
              path="/occupants/:occupantId"
              render={props => (
                <OccupantProfile
                  occupants={this.state.occupants}
                  updateOccupantDetails={this.updateOccupantDetails}
                  onSubmit={this.onEditOccupantFormSubmit}
                  openModal={this.openEditOccupantModal}
                  closeModal={this.closeModal}
                  isModalOpen={this.state.editOccupantModal.isModalOpen}
                  onChange={this.onEditOccupantFormChange}
                  modalStates={this.state.editOccupantModal}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/newApartment"
              render={props => (
                <NewApartmentForm
                  triggerRender={this.triggerRender}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/newOccupant"
              render={props => (
                <NewOccupantForm
                  triggerRender={this.triggerRender}
                  {...props}
                />
              )}
            />
            <Route component={NoMatchPage} />
          </Switch>
        </Router>
      </section>
    );
  }
}

const NoMatchPage = () => {
  return <h1>Path does not exist!</h1>;
};

export default App;
