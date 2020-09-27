import React from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const ticketShow = ({ ticket }) => {
  const { doRequest } = useRequest({
    method: "post",
    url: "/api/orders",
    body: {
      ticketId: ticket.id
    },
    onSuccess: data => Router.push("/orders/[orderId]", `/orders/${data.id}`)
  });
  return (
    <div className="container">
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

ticketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};

export default ticketShow;
