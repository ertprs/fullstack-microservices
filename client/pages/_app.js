import "bootstrap/dist/css/bootstrap.css";

const app = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export const getServerSideProps = () => {
  console.log("custom app");
  return { props: {} };
};

app.getInitialProps = () => {
  console.log("custom app");
  return {};
};
export default app;
