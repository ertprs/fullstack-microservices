import React, { useState } from "react";
import useRequest from "../../hooks/useRequest";

const newTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors, defaultErrors } = useRequest({
    body: {
      title,
      price
    },
    method: "post",
    url: "/api/tickets",
    onSuccess: data => console.log(data)
  });
  return (
    <div className="container">
      <h1>Create a Ticket</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setTitle("");
          setPrice("");
          doRequest();
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={e => {
              defaultErrors();
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            onChange={e => {
              defaultErrors();
              setPrice(e.target.value);
            }}
            value={price}
            onBlur={() => {
              const value = parseFloat(price);
              if (isNaN(value)) {
                return;
              }
              setPrice(value.toFixed(2));
            }}
          />
        </div>

        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default newTicket;
