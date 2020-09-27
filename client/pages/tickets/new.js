import React, { useState } from "react";

const newTicket = () => {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  return (
    <div className="container">
      <h1>Create a Ticket</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(title);
          console.log(price);
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default newTicket;
