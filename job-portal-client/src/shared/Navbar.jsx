import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContecxt from "../context/AuthContext";
import jobicon from "../assets/job-logo.png";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const { user,signOutUser } = useContext(AuthContecxt);

  const handleSignOut = () =>{
    signOutUser()
    .then(() => console.log('Sign out successfull')
    )
    .catch(error => console.log('Failed to sign out.', error.message))
  }

  const links = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/jobs'>All Jobs</NavLink></li>
      <li><NavLink to='/myApplications'>My Applications</NavLink></li>
      <li><NavLink to='/addjob'>Add a Job</NavLink></li>
      <li><NavLink to='/mypostedjobs'>MY-Job</NavLink></li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><img className="w-15" src={jobicon} alt="" />
        <h3 className="text-3xl">Job Portal</h3>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button onClick={handleSignOut} className="btn">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to={"/signin"}>
              <button className="btn">Sign in</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
