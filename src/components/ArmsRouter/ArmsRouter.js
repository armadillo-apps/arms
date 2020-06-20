import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import UserContext from "../../context/UserContext";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./ArmsRouter.module.css";
import {
  fetchApartments,
  fetchOccupants,
  fetchStays,
  logoutUser,
  updateApartment
} from "../../api/api";
import SideBar from "../SideBar/SideBar";
import { Apartment } from "../Apartment/Apartment";
import NewOccupantForm from "../NewOccupantForm/NewOccupantForm";
import NewApartmentForm from "../NewApartmentForm/NewApartmentForm";
import ApartmentProfile from "../ApartmentProfile/ApartmentProfile";

import NewUserForm from "../NewUserForm/NewUserForm";
import UserManagement from "../UserManagement/UserManagement";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import { LOGOUT_USER } from "../../reducer/userReducer";
import Occupants from "../../containers/Occupants";
import OccupantProfile from "../../containers/OccupantProfile";

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts();
    return <Component {...props} {...toastFuncs} />;
  };
}

class ArmsRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: [],
      occupants: [],
      stays: [],
      isLoggedIn: false,
      email: "",
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
        email: user.email
      });
      const apartments = await fetchApartments();
      this.setState({ apartments });
      const occupants = await fetchOccupants();
      this.setState({ occupants });
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
          email: user.email
        });
        const apartments = await fetchApartments();
        this.setState({ apartments });
        const occupants = await fetchOccupants();
        this.setState({ occupants });
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

  closeModal = id => {
    this.setState({
      [id]: {
        isModalOpen: false,
        message: ""
      }
    });
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
      const { state: user } = this.context;
      return (
        <section className={styles.app}>
          <Router>
            <SideBar
              data-testid={"sidebar"}
              isLoggedIn={this.state.isLoggedIn}
              logout={this.logout}
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
                    {...props}
                  />
                )}
              />
              <Route exact path="/occupants" render={() => <Occupants />} />
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
                render={() => <OccupantProfile />}
              />
              {user.role === "admin" ? (
                <Route exact path="/users" component={UserManagement} />
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
                path="/changePassword"
                render={props => (
                  <ChangePasswordForm
                    email={this.state.email}
                    triggerRender={this.triggerRender}
                    {...props}
                  />
                )}
              />
              {user.role === "admin" ? (
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

export default withToast(ArmsRouter);
