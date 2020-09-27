const index = ({ currentUser, name }) => {
  return (
    <div>
      {name}
      {currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are NOT signed in</h1>
      )}
    </div>
  );
};

index.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default index;
