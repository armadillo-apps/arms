import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "rgb(255,255,255)",
    transform: "translate(-50%, -50%)",
    width: "700px",
    height: "900px",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "15px",
    boxShadow: "0px 4px 4px rgba(150, 150, 150, 0.25)"
  }
};

Modal.setAppElement("body");

const EditApartmentModal = ({ isModalOpen, closeModal, children }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      contentLabel="EditApartmentModal"
    >
      {children}
    </Modal>
  );
};

export default EditApartmentModal;
