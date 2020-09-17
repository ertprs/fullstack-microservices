import React, { useState } from "react";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log({ email });
          console.log({ password });
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
