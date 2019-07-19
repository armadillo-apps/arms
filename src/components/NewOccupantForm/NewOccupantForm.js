import React, { Component } from "react";
import { createNewOccupant } from "../../api/api";
import "./NewOccupantForm.css";
import Input from "../Input/Input";

class NewOccupantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employeeId: "",
      remarks: ""
    };
  }

  onFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onFormSubmit = async () => {
    await createNewOccupant(
      this.state.name,
      this.state.employeeId,
      this.state.remarks
    );

    this.setState({
      name: "",
      employeeId: "",
      remarks: ""
    });
  };

  render() {
    return (
      <div className="occupantFormContainer">
        <h1 className="occupantForm__heading">Create New Occupant</h1>
        <div className="occupantForm">
          <Input
            label="Name"
            name="name"
            onChange={this.onFormChange}
            value={this.state.name}
            type="text"
            required
          />
          <Input
            label="Employee ID"
            name="employeeId"
            onChange={this.onFormChange}
            value={this.state.employeeId}
            type="text"
            required
          />
          <Input
            label="Remarks"
            name="remarks"
            onChange={this.onFormChange}
            value={this.state.remarks}
            type="text"
            required
          />
        </div>
        <button
          className="occupantForm__createButton"
          onClick={this.onFormSubmit}
        >
          Create
        </button>
      </div>
    );
  }
}

export default NewOccupantForm;
