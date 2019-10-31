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
          <div className="occupantForm__split">
            <section>
              <label htmlFor="gender" className="occupantForm__genderLabel">
                Gender
              </label>
              <select
                id="gender"
                label="Gender"
                name="gender"
                onChange={this.onFormChange}
                value={this.state.gender}
                type="text"
              >
                <option value="">Select...</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="neutral">neutral</option>
              </select>
            </section>
            <Input
              id="country"
              label="Country"
              name="country"
              onChange={this.onFormChange}
              value={this.state.country}
              type="text"
            />
          </div>
          <section>
            <label htmlFor="status" className="occupantForm__statusLabel">
              Occupant Status*
            </label>
            <select
              id="status"
              name="status"
              required
              value={this.state.status}
              onChange={this.onFormChange}
            >
              <option value="">Select...</option>
              <option value="allocated">Allocated</option>
              <option value="unallocated">Unallocated</option>
              <option value="inactive">Inactive</option>
            </select>
          </section>
          <TextArea
            id="remarks"
            label="Remarks"
            name="remarks"
            className="occupantForm__remarks"
            onChange={this.onFormChange}
            value={this.state.remarks}
            type="text"
          />
        </div>
        {this.state.submitted ? (
          <ConfirmationMessage
            success={this.state.success}
            message={this.state.message}
          />
        ) : (
          ""
        )}
        <input
          className="occupantForm__createButton"
          value="Create"
          type="submit"
        />
      </form>
    );
  }
}

export default NewOccupantForm;
