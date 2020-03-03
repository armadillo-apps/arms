import React, { useState } from "react";
import "./NewUserForm.css";
import Input from "../Input/Input";
import { createNewUser } from "../../api/api";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

const NewUserForm = props => {
  const emptyForm = {
    name: "",
    email: "",
    password: "",
    role: ""
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFormChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onFormSubmit = async event => {
    try {
      event.preventDefault();

      await createNewUser(
        formInputs.name,
        formInputs.email,
        formInputs.password,
        formInputs.role
      );

      setMessage("Success");
      setSuccess(true);
      setSubmitted(true);

      props.triggerRender();
    } catch (err) {
      setMessage("Unable to create new user :(");
      setSuccess(false);
      setSubmitted(true);
    }
  };

  return (
    <form className="newUserFormContainer" onSubmit={onFormSubmit}>
      <h1 className="newUserForm__heading">Create New User</h1>
      <div className="newUserForm">
        <Input
          id="name"
          label="Name*"
          name="name"
          onChange={onFormChange}
          value={formInputs.name}
          type="text"
          required
        />
        <Input
          id="email"
          label="Email*"
          name="email"
          onChange={onFormChange}
          value={formInputs.email}
          type="text"
          required
        />
        <Input
          id="password"
          label="Password*"
          name="password"
          onChange={onFormChange}
          value={formInputs.password}
          type="text"
          required
        />
        <section>
          <label htmlFor="role" className="userForm__roleLabel">
            User Role
          </label>
          <select
            id="role"
            name="role"
            onChange={onFormChange}
            value={formInputs.role}
            type="text"
          >
            <option value="">Select Role...</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </section>
      </div>
      {submitted ? (
        <ConfirmationMessage success={success} message={message} />
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
};

export default NewUserForm;
