import React, { useState, useEffect } from "react";

import { fetchUsers, removeUser, editUserRole } from "../../api/api";
import DeleteUserModal from "../Modal/DeleteUserModal";
import EditUserModal from "../Modal/EditUserModal";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [usersList, setUsersList] = useState([]);
  const [userToDelete, setUserToDelete] = useState("");
  const [userToEdit, setUserToEdit] = useState("");
  const [dialogOpen, setDialogOpen] = useState({
    isConfirmationModalOpen: false,
    isEditUserModalOpen: false
  });

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let users;
      try {
        users = await fetchUsers();
        setUsersList(users);
      } catch (err) {
        setSuccess(false);
      }
    };
    fetchData();
  }, []);

  const openModal = id => {
    setDialogOpen({ [id]: true });
    setMessage("");
  };

  const closeModal = id => {
    setDialogOpen({ [id]: false });
    setMessage("");
  };

  const deleteUser = async () => {
    try {
      const newUsersList = await removeUser(userToDelete);
      setUsersList(newUsersList);
    } catch (err) {
      setMessage("Unable to delete user");
    }
  };

  const editUser = async role => {
    try {
      const newUsersList = await editUserRole(userToEdit, role);
      setUsersList(newUsersList);
    } catch (err) {
      setMessage("Unable to edit user role");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userManagementContainer}>
        <h1 className={styles.heading1}>User Management</h1>
        <DeleteUserModal
          modalIsOpen={dialogOpen.isConfirmationModalOpen}
          closeModal={() => closeModal("isConfirmationModalOpen")}
          deleteUser={deleteUser}
          contentLabel="DeleteUserModal"
          success={success}
          message={message}
        />
        <EditUserModal
          modalIsOpen={dialogOpen.isEditUserModalOpen}
          closeModal={() => closeModal("isEditUserModalOpen")}
          editUser={editUser}
          contentLabel="EditUserModal"
          success={success}
          message={message}
        />
      </div>
      <table className={styles.table} cellSpacing="0" cellPadding="0">
        <thead className={styles.heading2}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map(user => {
            return (
              <tr key={user._id} className={styles.details}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      openModal("isEditUserModalOpen");
                      setUserToEdit(user._id);
                    }}
                  >
                    Edit Role
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      openModal("isConfirmationModalOpen");
                      setUserToDelete(user._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
