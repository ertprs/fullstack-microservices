import React from "react";

const ticketShow = ({ ticket }) => {
  return (
    <div className="container">
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      <button className="btn btn-primary">Purchase</button>
    </div>
  );
};

ticketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};

export default ticketShow;
