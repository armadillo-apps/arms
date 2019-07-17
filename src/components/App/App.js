import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import SideBar from "../SideBar/SideBar";
import Apartment from "../Apartment/Apartment";
import Occupant from "../Occupant/Occupant";
import NewOccupantForm from "../NewOccupantForm/NewOccupantForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onOccupantFormSubmit = () => {
    this.setState({
      occupantFormName: "",
      occupantFormEmployeeId: "",
      remarks: ""
    })
  }

  render() {
    return (
      <section className="app">
        <Router>
          <SideBar />
          <Switch>
            <Route component={Apartment} exact path="/" />
            <Route component={Occupant} exact path="/occupants" />
            <Route
              render={() => <NewOccupantForm onChange={this.onChange} onClick={this.onOccupantFormSubmit} />}
              exact
              path="/newOccupant"
            />
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
