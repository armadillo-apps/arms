import React from "react";
import Modal from "react-modal";
import styles from "./ConfirmationModal.module.css";
import { roles } from "../../constants/roles";

Modal.setAppElement("body");

const EditUserModal = ({ modalIsOpen, closeModal, editUser, newRole }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "rgb(255,255,255)",
      transform: "translate(-50%, -50%)",
      width: "300px",
      height: "150px",
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "15px",
      boxShadow: "0px 4px 4px rgba(150, 150, 150, 0.25)"
    }
  };

  const onFormChange = event => {
    newRole = event.target.value;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      contentLabel="EditUserModal"
    >
      <div>
        <p className={styles.modalText}>Select a role for user:</p>
        <section className={styles.roleSelector}>
          <select
            id="roles"
            label="roleNames"
            name="roles"
            onChange={onFormChange}
            type="text"
            data-testid="roleSelector"
          >
            <option value="">Select role</option>
            {Object.values(roles).map((role, index) => {
              return (
                <option key={index} value={role}>
                  {role}
                </option>
              );
            })}
          </select>
        </section>
        <div className={styles.modalButtons}>
          <button onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={() => {
              editUser(newRole);
              setTimeout(() => closeModal(), 1000);
            }}
            className={styles.confirmButton}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
