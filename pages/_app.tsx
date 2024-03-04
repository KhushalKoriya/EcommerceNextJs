import { Provider, useSelector } from 'react-redux';
import '../styles/styles.css';
import '../styles/header.css';
import '../styles/footer.css';
import { AppProps } from 'next/app';
import store, { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { refreshAccessToken } from '../utils/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [refreshResponse, setRefreshResponse] = useState<any>(null);
  console.log(store.getState());
  // const StoreData = store.getState();
  // const Credentials = StoreData.login.credentials;

  // const credentials = useSelector((state: RootState) => state);
  // console.log(credentials,"credentials");

  useEffect(() => {
    let token = localStorage.getItem("user");
    let refreshToken = Cookies.get("refreshToken");
    if (token !== null) {
      token = JSON.parse(token).token;
    } if (token && refreshToken) {
      router.push('/components/pagesLayout/home');
      return;
    }
    if (!token || !refreshToken) {
      router.push('/');
    }
    else {
      console.log("Token not found in localStorage");
    }
    const refresh = async () => {
      try {
        const response = await refreshAccessToken(token, refreshToken);
        console.log("response:", response);
        setRefreshResponse(response);

      } catch (error) {
        console.error('Failed to refresh access token:', error);
      }
    };
    refresh();

  }, []);
  useEffect(() => {
    if (refreshResponse === undefined) {
      localStorage.removeItem('user');
      Cookies.remove('refreshToken');
      router.push('/');
    }
  }, [refreshResponse]);
  return (<Provider store={store}> <Component {...pageProps} />  </Provider>);
}

export default App;