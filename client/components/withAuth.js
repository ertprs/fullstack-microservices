import React from "react";
import Router from "next/router";

const withAuth = Component => {
  let receivedProps;
  const newComponent = props => {
    receivedProps = props;
    if (typeof window !== "undefined" && !props.currentUser) {
      Router.replace("/auth/signin");
      return null;
    }
    return <Component {...props} />;
  };
  newComponent.getInitialProps = async ctx => {
    console.log(receivedProps);
    if (
      typeof window === "undefined" &&
      receivedProps &&
      !receivedProps.currentUser
    ) {
      ctx.res.writeHead(302, { Location: "/auth/signin" });
      ctx.res.end();
    }
    return {};
  };
  return newComponent;
};

export default withAuth;
