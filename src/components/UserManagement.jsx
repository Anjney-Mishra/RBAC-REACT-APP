import React, { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import { useAuth } from "../contexts/AuthContext";

const UserManagement = () => {
  const { user } = useAuth();
  const [allusers, setAllUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const roles = JSON.parse(localStorage.getItem("roles"));

  //searching & filtering
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    let filtered = allusers;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (filterRole !== "all") {
      filtered = filtered.filter((u) => u.role === filterRole);
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((u) => u.status === filterStatus);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, filterRole, filterStatus, allusers]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setAllUsers(JSON.parse(storedUsers));
    }
  }, []);



  const handleDeleteUser = (userID) => {
    if (userToDelete) {
      const updatedUsers = allusers.filter((u) => u.id !== userID);
      setAllUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUserToDelete(null);
    }
  };

  const handleEditUser = (userId) => {
    const updatedUsers = allusers.map((u) =>
      u.id === userId ? userToEdit : u
    );
    setAllUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUserToEdit(null);
    alert("User updated successfully!");
  };

  const toggleUserStatus = (userID) => {
    const updatedUsers = allusers.map((user) =>
      user.id === userID
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    );
    setAllUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="all">All Roles</option>
          {Object.keys(roles).map((role) => (
            <option key={role} value={role}>
              {role.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <AddUserModal setAllUsers={setAllUsers} />
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="font-bold text-lg">Name</th>
              <th className="font-bold text-lg">Email</th>
              <th className="font-bold text-lg">Role</th>
              <th className="font-bold text-lg">Status</th>
              {user.status === "active" ? (
                <>
                  <th className="font-bold text-lg">Actions</th>
                  <th className="font-bold text-lg">Activation</th>
                </>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  {u.role === "admin" ? (
                    <span className="text-accent">ADMIN</span>
                  ) : (
                    <span>{u.role}</span>
                  )}
                </td>
                <td>
                  {u.status === "active" ? (
                    <span className="text-success">ACTIVE</span>
                  ) : (
                    <span className="text-error">INACTIVE</span>
                  )}
                </td>
                {user.status === "active" ? (
                  <>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => setUserToEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-sm mr-2"
                        onClick={() => setUserToDelete(u)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      {
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            className="toggle toggle-success"
                            checked={u.status === "active"}
                            onChange={() => toggleUserStatus(u.id)}
                          />
                        </label>
                      }
                    </td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {userToDelete && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p>{`Are you sure you want to delete the user ${userToDelete.username} ?`}</p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => handleDeleteUser(userToDelete.id)}
              >
                Delete
              </button>
              <button className="btn" onClick={() => setUserToDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
      {userToEdit && (
        <dialog id="edit_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit User</h3>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setUserToEdit(null)}
              >
                ✕
              </button>
            </form>
            <form
              className="mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditUser(userToEdit.id);
              }}
            >
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  value={userToEdit.username}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, username: e.target.value })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={userToEdit.email}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, email: e.target.value })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={userToEdit.password}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, password: e.target.value })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  value={userToEdit.role}
                  onChange={(e) =>
                    setUserToEdit({ ...userToEdit, role: e.target.value })
                  }
                  className="select select-bordered w-full"
                  required
                >
                  {Object.keys(roles).map((role) => (
                    <option value={role}>{role.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UserManagement;
