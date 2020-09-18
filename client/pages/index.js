import withAuth from "../components/withAuth";

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

export default withAuth(index);
