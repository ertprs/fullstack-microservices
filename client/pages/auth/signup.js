import React, { useState } from "react";
import useRequest from "../../hooks/useRequest";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors, defaultErrors } = useRequest({
    method: "post",
    url: "/api/users/signup",
    body: { email, password }
  });
  return (
    <div className="container">
      <form
        onSubmit={async e => {
          e.preventDefault();
          await doRequest();
        }}
      >
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            onChange={e => {
              defaultErrors();
              setEmail(e.target.value);
            }}
            value={email}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={e => {
              defaultErrors();
              setPassword(e.target.value);
            }}
            value={password}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default signup;
