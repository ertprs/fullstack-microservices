import React, { useState } from "react";
import axios from "axios";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <form
        onSubmit={async e => {
          e.preventDefault();

          const res = await axios.post("/api/users/signup", {
            email,
            password
          });

          console.log(res.data);
          setEmail("");
          setPassword("");
        }}
      >
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default signup;
