import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { addApartment } from '../../service/data';
import { createNewOccupant } from '../../api/api';
import SideBar from '../SideBar/SideBar';
import Apartment from '../Apartment/Apartment';
import Occupant from '../Occupant/Occupant';
import NewOccupantForm from '../NewOccupantForm/NewOccupantForm';
import NewApartmentForm from '../NewApartmentForm/NewApartmentForm';
import OccupantProfile from '../OccupantProfile/OccupantProfile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onOccupantFormSubmit = async () => {
    await createNewOccupant(
      this.state.occupantFormName,
      this.state.occupantFormEmployeeId,
      this.state.occupantFormRemarks
    );
    this.setState({
      occupantFormName: '',
      occupantFormEmployeeId: '',
      occupantFormRemarks: ''
    });
  };

  onApartmentFormSubmit = async () => {
    const apartmentFormInputs = Object.keys(this.state).filter(key =>
      key.includes('apartmentForm')
    );
    const newApartment = apartmentFormInputs.reduce((obj, key) => {
      obj[key] = this.state[key];
      return obj;
    }, {});
    const addedApartment = await addApartment(newApartment);
    console.log(addedApartment);
    apartmentFormInputs.map(inputField => this.setState({ [inputField]: '' }));
  };

  render() {
    return (
      <section className="app">
        <Router>
          <SideBar />
          <Switch>
            <Route component={Apartment} exact path="/" />
            <Route
              render={props => <Occupant {...props} />}
              exact
              path="/occupants"
            />
            <Route
              render={() => (
                <NewOccupantForm
                  onChange={this.onChange}
                  onSubmit={this.onOccupantFormSubmit}
                />
              )}
              exact
              path="/newOccupant"
            />
            <Route
              render={() => (
                <NewApartmentForm
                  onChange={this.onChange}
                  onSubmit={this.onApartmentFormSubmit}
                />
              )}
              exact
              path="/newApartment"
            />
            <Route component={OccupantProfile} path="/occupants" />
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
