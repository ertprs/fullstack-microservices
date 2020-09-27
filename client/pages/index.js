const index = ({ currentUser, tickets }) => {
  return (
    <div className="container">
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length !== 0 &&
            tickets.map(ticket => {
              return (
                <tr key={ticket.id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};

export default index;
