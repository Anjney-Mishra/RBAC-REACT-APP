import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const roles = JSON.parse(localStorage.getItem("roles"));

    const {logout} = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/login');
    }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
          {
            user?.role === "admin" ?
            <>
            <li>
              <a onClick={() => navigate('/admin/usermanagement')}>UserManagement</a>
            </li>
            <li>
              <a onClick={() => navigate('/admin/rolemanagement')}>RoleManagement</a>
            </li>
            </>:<></>
          }
          </ul>
        </div>
        <a className="font-bold text-xl cursor-pointer" onClick={()=>navigate('/')}>RBAC DEMO</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
          {
            user?.role === "admin" ?
            <>
            <li>
              <a onClick={() => navigate('/admin/usermanagement')}>UserManagement</a>
            </li>
            <li>
              <a onClick={() => navigate('/admin/rolemanagement')}>RoleManagement</a>
            </li>
            </>
            :
            <>
            </>
          }
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ?
          <button className="btn" onClick={handleLogout}>Logout</button>
          :
          <button className="btn" onClick={() => {navigate('/login')}}>Login</button>
        }
      </div>
    </div>
  );
};

export default Navbar;
