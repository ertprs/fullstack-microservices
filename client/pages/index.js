import React from "react";
import axios from "axios";

const index = props => {
  console.log(props);
  return <div>Home page</div>;
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: {
        Host: "ticketing.dev"
      }
    }
  );
  return { props: data };
};

export default index;
