import Modal from "react-modal";
import React from "react";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import styles from "./ConfirmationModal.module.css";

const ConfirmationModal = ({
  modalIsOpen,
  closeModal,
  deleteStay,
  success,
  message
}) => {
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

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      contentLabel="confirmationModal"
    >
      <div>
        <p className={styles.modalText}>
          Are you sure you want to delete this entry?
        </p>
        <div className={styles.modalButtons}>
          <button onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={() => {
              deleteStay();
              setTimeout(() => closeModal(), 1000);
            }}
            className={styles.confirmButton}
          >
            Delete
          </button>
        </div>

        <ConfirmationMessage success={success} message={message} />
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
