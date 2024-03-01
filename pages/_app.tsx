import { Provider } from 'react-redux';
import '../styles/styles.css';
import { AppProps } from 'next/app';
import store from '../store/store';
import { useEffect } from 'react';
import { refreshAccessToken } from '../utils/auth';
import Cookies from 'js-cookie';
const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    let token = localStorage.getItem("user");
    let refreshToken = Cookies.get("refreshToken");
    console.log(refreshToken,"refeshToken");
    
if (token !== null) {
    console.log("token", token);
    token = JSON.parse(token).token;
    console.log("token", token);
} else {
    console.log("Token not found in localStorage");
}
console.log(token,"tokentokentokentokentoken");

    const refresh = async () => {
      try {
        await refreshAccessToken(token,refreshToken);
      } catch (error) {
        // Handle refresh token failure (e.g., redirect to login page)
        console.error('Failed to refresh access token:', error);
      }
    };
    refresh();

  }, []);
  return (<Provider store={store}> <Component {...pageProps} />  </Provider>);
}

export default App;