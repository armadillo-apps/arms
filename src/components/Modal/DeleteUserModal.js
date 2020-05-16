import Modal from "react-modal";
import React from "react";
import { useToasts } from "react-toast-notifications";
import styles from "./ConfirmationModal.module.css";

Modal.setAppElement("body");

const DeleteUserModal = ({ modalIsOpen, closeModal, deleteUser }) => {
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

  const { addToast } = useToasts();

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      contentLabel="DeleteUserModal"
    >
      <div>
        <p className={styles.modalText}>
          Are you sure you want to delete this user?
        </p>
        <div className={styles.modalButtons}>
          <button onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={() => {
              try {
                deleteUser();
                setTimeout(() => closeModal(), 1000);

                addToast("The user has been succesfully deleted", {
                  appearance: "success",
                  autoDismiss: true
                });
              } catch (err) {
                addToast("Unable to delete the user :(", {
                  appearance: "error",
                  autoDismiss: true
                });
              }
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

export default DeleteUserModal;
