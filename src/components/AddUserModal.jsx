import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserModal = ({setAllUsers}) => {
    const roles = JSON.parse(localStorage.getItem("roles"));
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('')
    const [status,setStatus] = useState(false)


    const handleAddUser = (e) => {
        e.preventDefault();
        if (!username || !email || !role) {
            alert("Please fill out all required fields!");
            return;
        }
        const newUser = {
            id: Date.now(),
            username,
            email,
            password,
            role,
            status: status ? "active" : "inactive",
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = [newUser,...existingUsers];
        setAllUsers(updatedUsers);
        localStorage.setItem('users',JSON.stringify(updatedUsers));

        setUserName('');
        setEmail('');
        setPassword('');
        setRole('');
        setStatus(false);
    
        // Notify user of success
        alert("User added successfully!");
    }

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add User
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add User</h3>
          <form className="mt-3" onSubmit={handleAddUser}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="role"
                  className="select select-bordered w-full"
                  defaultValue=""
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  {
                    Object.keys(roles).map((role,index)=>(
                      <option value={role} key={index}>{role.toUpperCase()}</option>
                    ))
                  }
                </select>
              </div>
              <div className="form-control mb-4">
                <label className="label cursor-pointer">
                  <span className="label-text">Active Status</span>
                  <input
                    type="checkbox"
                    name="status"
                    className="toggle toggle-primary"
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                </label>
              </div>
              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary w-full">
                    Add User
                </button>
                </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddUserModal;
