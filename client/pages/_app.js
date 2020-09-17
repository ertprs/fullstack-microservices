import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import axios from "axios";
import Header from "../components/Header";

const app = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />;
    </div>
  );
};

app.getInitialProps = async appContext => {
  let pageProps = {};
  if (typeof window === "undefined") {
    const { data } = await buildClient(appContext.ctx).get(
      "/api/users/currentuser"
    );
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return { ...data, pageProps };
  }
  const { data } = await axios.get("/api/users/currentuser");
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { ...data, pageProps };
};
export default app;
