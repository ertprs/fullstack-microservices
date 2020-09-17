import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";

const useRequest = ({ method, url, body }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      Router.push("/");
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oooops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  const defaultErrors = () => errors && setErrors(null);
  return { doRequest, errors, defaultErrors };
};

export default useRequest;
