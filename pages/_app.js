import '../styles/global.css'
import { Provider } from "react-redux";
import store from "../redux-config/store";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function App({ Component, pageProps }) {
  return <Provider store={store}> <Component {...pageProps} /></Provider>
}
