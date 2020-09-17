import React, { useState } from "react";
import axios from "axios";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  return (
    <div className="container">
      <form
        onSubmit={async e => {
          e.preventDefault();
          try {
            const res = await axios.post("/api/users/signup", {
              email,
              password
            });

            console.log(res.data);
            setEmail("");
            setPassword("");
          } catch (error) {
            setErrors(error.response.data.errors);
          }
        }}
      >
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            onChange={e => {
              errors.length !== 0 && setErrors([]);
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
              errors.length !== 0 && setErrors([]);
              setPassword(e.target.value);
            }}
            value={password}
            className="form-control"
          />
        </div>
        {errors.length !== 0 && (
          <div className="alert alert-danger">
            <h4>Oooops...</h4>
            <ul className="my-0">
              {errors.length !== 0 &&
                errors.map(err => <li key={err.message}>{err.message}</li>)}
            </ul>
          </div>
        )}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default signup;
