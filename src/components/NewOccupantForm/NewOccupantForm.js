import React, { Component } from "react";
import "./NewOccupantForm.css";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { createNewOccupant } from "../../api/api";

class NewOccupantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employeeId: "",
      gender: "",
      remarks: "",
      country: "",
      status: "",
      success: false,
      message: "",
      submitted: false
    };
  }

  onFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onFormSubmit = async event => {
    try {
      event.preventDefault();
      const { name, employeeId, gender, remarks, country, status } = this.state;
      const response = await createNewOccupant(
        name,
        employeeId,
        gender,
        remarks,
        country,
        status
      );
      this.setState({
        name: "",
        employeeId: "",
        gender: "",
        remarks: "",
        country: "",
        status: "",
        success: true,
        message: response,
        submitted: true
      });
      this.props.triggerRender();
    } catch (err) {
      this.setState({
        success: false,
        message: "Unable to create new occupant :(",
        submitted: true
      });
    }
  };

  render() {
    return (
      <form className="occupantFormContainer" onSubmit={this.onFormSubmit}>
        <h1 className="occupantForm__heading">Create New Occupant</h1>
        <div className="occupantForm">
          <Input
            id="name"
            label="Name*"
            name="name"
            onChange={this.onFormChange}
            value={this.state.name}
            type="text"
            required
          />
          <Input
            id="employee-id"
            label="Employee ID"
            name="employeeId"
            onChange={this.onFormChange}
            value={this.state.employeeId}
            type="text"
          />
          <Input
            id="gender"
            label="Gender"
            name="gender"
            onChange={this.onFormChange}
            value={this.state.gender}
            type="text"
          />
          <TextArea
            id="remarks"
            label="Remarks"
            name="remarks"
            onChange={this.onFormChange}
            value={this.state.remarks}
            type="text"
          />
          <Input
            id="country"
            label="Country"
            name="country"
            onChange={this.onFormChange}
            value={this.state.country}
            type="text"
            required
          />
          <section>
            <label htmlFor="status" className="occupantForm__statusLabel">
              Occupant Status:{" "}
            </label>
            <select
              id="status"
              name="status"
              value={this.state.status}
              onChange={this.onFormChange}
            >
              <option value="">Select...</option>
              <option value="allocated">Allocated</option>
              <option value="unallocated">Unallocated</option>
              <option value="inactive">Inactive</option>
            </select>
          </section>
        </div>
        <input
          className="occupantForm__createButton"
          value="Create"
          type="submit"
        />
        {this.state.submitted ? (
          <ConfirmationMessage
            success={this.state.success}
            message={this.state.message}
          />
        ) : (
          ""
        )}
      </form>
    );
  }
}

export default NewOccupantForm;
