const index = ({ currentUser }) => {
  return (
    <div>
      {currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are NOT signed in</h1>
      )}
    </div>
  );
};

export default index;
