import React from "react";
import Router from "next/router";

let receivedProps;

const withAuth = Component => {
  const newComponent = props => {
    receivedProps = props;
    if (typeof window !== "undefined" && !props.currentUser) {
      Router.replace("/auth/signin");
      return null;
    }
    return <Component {...props} />;
  };
  newComponent.getInitialProps = async ctx => {
    if (
      typeof window === "undefined" &&
      receivedProps &&
      !receivedProps.currentUser
    ) {
      ctx.res.writeHead(302, { Location: "/auth/signin" });
      ctx.res.end();
    }
    const componentProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));
    return { ...componentProps };
  };
  return newComponent;
};

export default withAuth;
