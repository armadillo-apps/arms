import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import UserContext from "../../context/UserContext";
import LoginForm from "../LoginForm/LoginForm";
import "./ArmsRouter.css";
import "../LoginForm/LoginForm.css";
import {
  fetchOccupants,
  fetchApartments,
  updateOccupant,
  updateApartment,
  fetchStays,
  logoutUser,
  fetchUsers
} from "../../api/api";
import SideBar from "../SideBar/SideBar";
import { Apartment } from "../Apartment/Apartment";
import Occupant from "../Occupant/Occupant";
import NewOccupantForm from "../NewOccupantForm/NewOccupantForm";
import NewApartmentForm from "../NewApartmentForm/NewApartmentForm";
import OccupantProfile from "../OccupantProfile/OccupantProfile";
import ApartmentProfile from "../ApartmentProfile/ApartmentProfile";

import NewUserForm from "../NewUserForm/NewUserForm";
import UserManagement from "../UserManagement/UserManagement";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import { LOGOUT_USER } from "../../reducer/userReducer";

class ArmsRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: [],
      occupants: [],
      users: [],
      stays: [],
      userRole: "",
      isLoggedIn: false,
      email: "",
      editOccupantModal: {
        isModalOpen: false,
        name: "",
        employeeId: "",
        gender: "",
        remarks: "",
        homeOffice: "",
        status: "",
        message: "",
        success: false
      },
      editApartmentModal: {
        success: false,
        message: ""
      },
      renderToggle: false
    };
  }

  componentDidMount = async () => {
    try {
      const { state: user } = this.context;
      this.setState({
        isLoggedIn: user.isAuthenticated,
        email: user.email,
        userRole: user.role
      });
      const apartments = await fetchApartments();
      this.setState({ apartments });
      const occupants = await fetchOccupants();
      this.setState({ occupants });
      const users = await fetchUsers();
      this.setState({ users });
      const stays = await fetchStays();
      this.setState({ stays });
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
        const users = await fetchUsers();
        this.setState({ users });
        const stays = await fetchStays();
        this.setState({ stays });
      } catch (err) {
        return err.message;
      }
    }
    const { state: user } = this.context;
    if (user.isAuthenticated !== prevState.isLoggedIn) {
      try {
        this.setState({
          isLoggedIn: user.isAuthenticated,
          email: user.email,
          userRole: user.role
        });
        const apartments = await fetchApartments();
        this.setState({ apartments });
        const occupants = await fetchOccupants();
        this.setState({ occupants });
        const users = await fetchUsers();
        this.setState({ users });
        const stays = await fetchStays();
        this.setState({ stays });
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

  getAllStays = async () => {
    try {
      const stays = await fetchStays();
      this.setState({ stays });
    } catch (err) {
      return err.message;
    }
  };

  openEditOccupantModal = (id, occupant) => {
    const {
      _id,
      name,
      employeeId,
      gender,
      homeOffice,
      remarks,
      status
    } = occupant;
    this.setState({
      [id]: {
        _id,
        name,
        employeeId,
        gender,
        homeOffice,
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
        homeOffice,
        status
      } = this.state.editOccupantModal;
      const response = await updateOccupant(
        _id,
        name,
        employeeId,
        gender,
        remarks,
        homeOffice,
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
          homeOffice: "",
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

  onEditApartmentFormSubmit = async (event, updatedApartment) => {
    try {
      event.preventDefault();
      const {
        apartmentId,
        name,
        address,
        bedrooms,
        capacity,
        country,
        status,
        leases,
        landlord,
        remarks
      } = updatedApartment;
      const response = await updateApartment(
        apartmentId,
        name,
        address,
        bedrooms,
        capacity,
        country,
        status,
        leases,
        landlord,
        remarks
      );
      this.setState({
        editApartmentModal: { success: true, message: response }
      });
      const apartments = await fetchApartments();
      this.setState({ apartments });
    } catch (err) {
      this.setState({
        editApartmentModal: {
          success: false,
          message: "Unable to update apartment"
        }
      });
    }
  };

  setUserRole = role => {
    this.setState({ userRole: role });
  };

  clearConfirmationMessage = () => {
    this.setState({
      editApartmentModal: { success: false, message: "" }
    });
  };

  logout = async () => {
    try {
      this.props.dispatch({ type: LOGOUT_USER });
      const logoutMessage = await logoutUser();
      this.setState({
        message: logoutMessage,
        isLoggedIn: false
      });
    } catch (err) {
      return err.message;
    }
  };

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <section>
          <Router>
            <Switch>
              <Route exact path="/apartments">
                <Redirect to="/" />
              </Route>
              <Route exact path="/" render={() => <LoginForm />} />
              <Route component={NoMatchPage} />
            </Switch>
          </Router>
        </section>
      );
    } else {
      return (
        <section className="app">
          <Router>
            <SideBar
              data-testid={"sidebar"}
              isLoggedIn={this.state.isLoggedIn}
              logout={this.logout}
              userRole={this.state.userRole}
            />
            <Switch>
              <Route exact path="/">
                <Redirect to="/apartments" />
              </Route>
              <Route
                exact
                path="/apartments"
                render={props => (
                  <Apartment
                    apartments={this.state.apartments}
                    stays={this.state.stays}
                    triggerRender={this.triggerRender}
                    {...props}
                  />
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
                    apartmentAssignModal={this.state.apartmentAssignModal}
                    confirmationModal={this.state.confirmationModal}
                    onSubmit={this.onEditApartmentFormSubmit}
                    editApartmentModal={this.state.editApartmentModal}
                    getAllStays={this.getAllStays}
                    clearConfirmationMessage={this.clearConfirmationMessage}
                    {...props}
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
              {this.state.userRole === "admin" ? (
                <Route
                  exact
                  path="/users"
                  render={props => (
                    <UserManagement users={this.state.users} {...props} />
                  )}
                />
              ) : (
                ""
              )}
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
              <Route
                exact
                path="/newUser"
                render={props => (
                  <NewUserForm triggerRender={this.triggerRender} {...props} />
                )}
              />
              <Route
                exact
                path="/changePassword"
                render={props => (
                  <ChangePasswordForm
                    email={this.state.email}
                    triggerRender={this.triggerRender}
                    {...props}
                  />
                )}
              />
              {this.state.userRole === "admin" ? (
                <Route
                  exactpath="/newUser"
                  render={props => (
                    <NewUserForm
                      triggerRender={this.triggerRender}
                      {...props}
                    />
                  )}
                />
              ) : (
                ""
              )}
            </Switch>
          </Router>
        </section>
      );
    }
  }
}

ArmsRouter.contextType = UserContext;

const NoMatchPage = () => {
  return <h1>Path does not exist!</h1>;
};

export default ArmsRouter;
