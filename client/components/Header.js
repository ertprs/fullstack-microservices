import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

const Header = ({ currentUser }) => {
  const [signout, setSignOut] = useState(null);
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {currentUser ? (
            <span>
              <li
                className="nav-item"
                onClick={async () => {
                  await axios.post("/api/users/signout");
                  setSignOut("signedout");
                }}
              >
                <Link href="/">
                  <a className="nav-link">Sign Out</a>
                </Link>
              </li>
            </span>
          ) : (
            <span className="nav d-flex align-items-center">
              <li className="nav-item">
                <Link href="/auth/signup">
                  <a className="nav-link">Sign Up</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/auth/signin">
                  <a className="nav-link">Sign In</a>
                </Link>
              </li>
            </span>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
