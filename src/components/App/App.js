import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import SideBar from "../SideBar/SideBar";
import Apartment from "../Apartment/Apartment";
import Occupant from "../Occupant/Occupant";
import { BrowserRouter } from "react-router-dom";
import NewOccupantForm from "../NewOccupantForm/NewOccupantForm";

function App() {
  return (
    <section className="app">
      <BrowserRouter>
        <SideBar />
        <Switch>
          <Route component={Apartment} exact path="/" />
          <Route component={Occupant} exact path="/occupants" />
          <Route component={NewOccupantForm} exact path="/newOccupant" />
        </Switch>
      </BrowserRouter>
    </section>
  );
}

export default App;
