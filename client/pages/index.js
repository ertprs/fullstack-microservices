import buildClient from "../api/build-client";

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

export const getServerSideProps = async context => {
  const { data } = await buildClient(context).get("/api/users/currentuser");
  return { props: data };
};

export default index;
