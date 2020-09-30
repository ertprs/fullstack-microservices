import React from "react";

const order = ({ orders }) => {
  return (
    <div>
      <ul>
        {orders.length !== 0 &&
          orders.map(order => {
            return (
              <li key={order.id}>
                {order.ticket.title} - {order.status}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

order.getInitialProps = async (ctx, client) => {
  const res = await client.get("/api/orders");
  return { orders: res.data };
};

export default order;
