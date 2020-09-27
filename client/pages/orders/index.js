import React from "react";

const order = ({ orders }) => {
  return (
    <div>
      <ul>
        {orders.length !== 0 &&
          orders.map(order => {
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>;
          })}
      </ul>
    </div>
  );
};

order.getInitialProps = async (ctx, client) => {
  const orders = await client.get("/api/orders");

  return { orders };
};

export default order;
