import Modal from "react-modal";
import React from "react";

const ApartmentAssignModal = ({ modalIsOpen, closeModal, children }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "rgb(224,224,224,0.8)",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "300px",
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "center"
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="apartmentAssignModal"
    >
      {children}
    </Modal>
  );
};

export default ApartmentAssignModal;
