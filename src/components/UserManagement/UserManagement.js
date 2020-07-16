import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { fetchUsers, removeUser, editUserRole } from "../../api/api";
import DeleteUserModal from "../Modal/DeleteUserModal";
import EditUserModal from "../Modal/EditUserModal";
import styles from "./UserManagement.module.css";
import { useFetch } from "../../hooks/useFetch";
import { isEmpty } from "../../utils/utils";

const UserManagement = ({ history }) => {
  const { data: users } = useFetch(fetchUsers);
  const [usersList, setUsersList] = useState([]);
  const [userToDelete, setUserToDelete] = useState("");
  const [userToEdit, setUserToEdit] = useState("");
  const [dialogOpen, setDialogOpen] = useState({
    isConfirmationModalOpen: false,
    isEditUserModalOpen: false
  });
  const { addToast } = useToasts();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUsersList(isEmpty(users) ? [] : users);
  }, [users]);

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
      const response = await removeUser(userToDelete);
      if (response.success) {
        setUsersList(response.data);
        addToast(response.message, {
          appearance: "success",
          autoDismiss: true
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      addToast(`Unable to delete user :( ${err.message}`, {
        appearance: "error",
        autoDismiss: true
      });
    }
  };

  const editUser = async role => {
    try {
      const response = await editUserRole(userToEdit, role);
      if (response.success) {
        setUsersList(response.data);
        addToast(response.message, {
          appearance: "success",
          autoDismiss: true
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      addToast(`Unable to edit user :( ${err.message}`, {
        appearance: "error",
        autoDismiss: true
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userManagementContainer}>
        <h1 className={styles.heading1}>User Management</h1>
        <div className={styles.addUserContainer}>
          <button
            className={styles.addUserButton}
            onClick={() => history.push("/newUser")}
          >
            + Add User
          </button>
        </div>
        <DeleteUserModal
          modalIsOpen={dialogOpen.isConfirmationModalOpen}
          closeModal={() => closeModal("isConfirmationModalOpen")}
          deleteUser={deleteUser}
          contentLabel="DeleteUserModal"
        />
        <EditUserModal
          modalIsOpen={dialogOpen.isEditUserModalOpen}
          closeModal={() => closeModal("isEditUserModalOpen")}
          editUser={editUser}
          contentLabel="EditUserModal"
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
