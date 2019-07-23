import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import {
  fetchOccupants,
  fetchApartments,
  createNewOccupant,
  createNewStay
} from "../../api/api";
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
      occupantToAssign: "",
      occupantId: "",
      apartmentId: "",
      checkInDate: "",
      checkOutDate: "",
      success: false,
      message: "",
      dropdown: true
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

  addNewOccupant = async ({ name, employeeId, remarks }) => {
    try {
      const response = await createNewOccupant(name, employeeId, remarks);
      const occupants = await fetchOccupants();
      this.setState({ occupants });
      return response;
    } catch (err) {
      throw err;
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
      console.log(response);
    } catch (err) {
      this.setState({
        success: false,
        message: err.message
      });
      console.log(err.message);
    }
  };

  filterByText = (field, id) => {
    if (this.state[id]) {
      return this.state[field].filter(element =>
        element.name.toLowerCase().includes(this.state[id].toLowerCase())
      );
    } else {
      return [];
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
                  {...props}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  filterByText={this.filterByText}
                  dropdown={this.state.dropdown}
                  addNewStay={this.addNewStay}
                  occupantToAssign={this.state.occupantToAssign}
                  success={this.state.success}
                  message={this.state.message}
                />
              )}
            />
            <Route
              path="/occupants/:occupantId"
              render={props => (
                <OccupantProfile occupants={this.state.occupants} {...props} />
              )}
            />
            <Route component={NewApartmentForm} exact path="/newApartment" />
            <Route
              exact
              path="/newOccupant"
              render={props => (
                <NewOccupantForm
                  addNewOccupant={this.addNewOccupant}
                  {...props}
                />
              )}
            />
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
