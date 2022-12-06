import "../styles/index.scss";
import Navigation from "../components/Navigation/Navigation";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app_wrapper">
      <Navigation />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
