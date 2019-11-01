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
                <option value="">Select Gender...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="neutral">Neutral</option>
              </select>
            </section>
            <section>
              <label
                htmlFor="country"
                className="occupantForm__homeOfficeLabel"
              >
                Home Office
              </label>
              <select
                id="country"
                name="country"
                onChange={this.onFormChange}
                value={this.state.country}
                type="text"
              >
                <option value="">Select Home Office...</option>
                <option value="Brisbane, Australia">Brisbane, Australia</option>
                <option value="Melbourne, Australia">
                  Melbourne, Australia
                </option>
                <option value="Sydney, Australia">Sydney, Australia</option>
                <option value="Belo Horizonte, Brazil">
                  Belo Horizonte, Brazil
                </option>
                <option value="Porto Alegre, Brazil">
                  Porto Alegre, Brazil
                </option>
                <option value="Recife, Brazil">Recife, Brazil</option>
                <option value="São Paulo, Brazil">São Paulo, Brazil</option>
                <option value="Santiago, Chile">Santiago, Chile</option>
                <option value="Beijing, China">Beijing, China</option>
                <option value="Chengdu, China">Chengdu, China</option>
                <option value="Hong Kong, China">Hong Kong, China</option>
                <option value="Shanghai, China">Shanghai, China</option>
                <option value="Shenzhen, China">Shenzhen, China</option>
                <option value="Wuhan, China">Wuhan, China</option>
                <option value="Xi'an, China">Xi'an, China</option>
                <option value="Quito, Ecuador">Quito, Ecuador</option>
                <option value="Berlin, Germany">Berlin, Germany</option>
                <option value="Cologne, Germany">Cologne, Germany</option>
                <option value="Hamburg, Germany">Hamburg, Germany</option>
                <option value="Munich, Germany">Munich, Germany</option>
                <option value="Stuttgart, Germany">Stuttgart, Germany</option>
                <option value="Bangalore, India">Bangalore, India</option>
                <option value="Chennai, India">Chennai, India</option>
                <option value="Coimbatore, India">Coimbatore, India</option>
                <option value="Gurgaon, India">Gurgaon, India</option>
                <option value="Hyderabad, India">Hyderabad, India</option>
                <option value="Mumbai, India">Mumbai, India</option>
                <option value="Pune, India">Pune, India</option>
                <option value="Milan, Italy">Milan, Italy</option>
                <option value="Atlanta, North America">
                  Atlanta, North America
                </option>
                <option value="Chicago, North America">
                  Chicago, North America
                </option>
                <option value="Dallas, North America">
                  Dallas, North America
                </option>
                <option value="Denver, North America">
                  Denver, North America
                </option>
                <option value="New York, North America">
                  New York, North America
                </option>
                <option value="San Francisco, North America">
                  San Francisco, North America
                </option>
                <option value="Toronto, North America">
                  Toronto, North America
                </option>
                <option value="Singapore, Singapore">
                  Singapore, Singapore
                </option>
                <option value="Barcelona, Spain">Barcelona, Spain</option>
                <option value="Madrid, Spain">Madrid, Spain</option>
                <option value="Bangkok, Thailand">Bangkok, Thailand</option>
                <option value="London, United Kingdom">
                  London, United Kingdom
                </option>
                <option value="Manchester, United Kingdom">
                  Manchester, United Kingdom
                </option>
              </select>
            </section>
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
