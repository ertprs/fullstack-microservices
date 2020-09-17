import buildClient from "../api/build-client";

const index = props => {
  console.log(props);
  return <div>Home page</div>;
};

export const getServerSideProps = async context => {
  const { data } = await buildClient(context).get("/api/users/currentuser");
  return { props: data };
};

export default index;
