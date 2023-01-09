import "../styles/index.scss";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app_wrapper">
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
