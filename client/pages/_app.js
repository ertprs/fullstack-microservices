import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/Header";

const app = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </div>
  );
};

app.getInitialProps = async appContext => {
  let pageProps = {};

  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  return { ...data, pageProps };
};
export default app;
