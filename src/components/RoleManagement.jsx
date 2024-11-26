import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const RoleManagement = () => {
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem("roles")));
  const[users,setUsers] = useState(JSON.parse(localStorage.getItem("users")));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [permissions, setPermissions] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleAddRole = () => {
    if (!newRole.trim()) {
      alert("Role name is required");
      return;
    }
    const updatedRoles = {
      ...roles,
      [newRole]: Object.keys(permissions).filter((perm) => permissions[perm]),
    };
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setNewRole("");
    setPermissions({
      create: false,
      read: false,
      update: false,
      delete: false,
    });
    toggleModal();
    alert("Role added successfully!");
  };

  const handlePermissionChange = (role, permission) => {
    const updatedRoles = {
      ...roles,
      [role]: roles[role].includes(permission)
        ? roles[role].filter((perm) => perm !== permission)
        : [...roles[role], permission],
    };
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
  };

  const handleRoleDelete = (role) => {
    if (role==="guest" || role==="admin") {
      alert("Cannot delete this role!");
      return;
    }

    const updatedRoles = { ...roles };
    delete updatedRoles[role];
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));

    const updatedUsers = [...users ];
    updatedUsers.forEach((user) => {
      if(user.role === role) user.role = "guest";
    })
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    alert(`Role "${role}" deleted successfully!`);
    
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Role Management For Products</h2>
      <button className="btn mb-4 btn-primary" onClick={toggleModal}>
        Add Role
      </button>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="font-bold text-lg">Role</th>
              <th className="font-bold text-lg">Create</th>
              <th className="font-bold text-lg">Read</th>
              <th className="font-bold text-lg">Update</th>
              <th className="font-bold text-lg">Delete</th>
              <th className="font-bold text-lg">REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(roles).map((role) => (
              <tr key={role}>
                <td className="font-medium">{role}</td>
                {["create", "read", "update", "delete"].map((perm) => (
                  <td key={perm}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-success"
                      checked={roles[role].includes(perm)}
                      onChange={() => handlePermissionChange(role, perm)}
                    />
                  </td>
                ))}
                  <td>
                    <button className="btn btn-error" onClick={()=>handleRoleDelete(role)}><MdDeleteForever className="text-2xl" /></button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Role</h3>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Role Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter role name"
                className="input input-bordered"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <span className="label-text mb-2">Permissions</span>
              {["create", "read", "update", "delete"].map((perm) => (
                <label
                  key={perm}
                  className="cursor-pointer flex items-center gap-2 mb-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    name={perm}
                    checked={permissions[perm]}
                    onChange={(e) =>
                      setPermissions({
                        ...permissions,
                        [perm]: e.target.checked,
                      })
                    }
                  />
                  <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
                </label>
              ))}
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAddRole}>
                Save
              </button>
              <button className="btn" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
