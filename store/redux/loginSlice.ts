import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from '../store';

// Define the interface for credentials
interface Credentials {
  username: string;
  id: string;
  exp: number; // Add expiration time to the credentials interface
}

// Define the interface for the login state
interface LoginState {
  credentials: Credentials | null;
  error: string | null;
}

// Function to initialize state with data from localStorage if available, otherwise with default values
const getInitialState = (): LoginState => {
  let credentials: Credentials | null = null;
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      credentials = JSON.parse(storedUser);
    }
  }
  return {
    credentials,
    error: null,
  };
};

// Function to check if token is expired
// const isTokenExpired = (token: string): boolean => {
//   const decodedToken = decodeToken(token);
//   if (decodedToken && decodedToken.exp) {
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     return decodedToken.exp < currentTime; // Compare expiration time with current time
//   }
//   return true; // If token decoding fails or no expiration time found, consider it expired
// };

// Decode the JWT token payload
// const decodeToken = (token: string): Credentials => {
//   const payload = token.split('.')[1]; // JWT payload is the second part of the token
//   const jwttoken = JSON.parse(atob(payload));
//   console.log(jwttoken,"tokensss");
  
//   return JSON.parse(atob(payload)); // Decode Base64 and parse JSON
// };

// Create the login slice
const loginSlice = createSlice({
  name: 'login',
  initialState: getInitialState(),
  reducers: {
    setCredentials(state, action: PayloadAction<Credentials>) {
      state.credentials = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // resetCredentials(state) {
    //   state.credentials = null;
    // },
  },
});

// Export actions and reducer
export const { setCredentials, setError } = loginSlice.actions;
export default loginSlice.reducer;

// Example usage to check token expiration
// Replace 'your_jwt_token_here' with the actual JWT token you want to check
// if (typeof window !== 'undefined') {
//   const storedUser = localStorage.getItem('user');

//   // Check if storedUser is not null before accessing its properties
//   if (storedUser) {
//     const data = JSON.parse(storedUser);

//     // Access the token property
//     const token = data.token;

//     console.log(token,"token");
//     // const token = {token};
//     if (isTokenExpired(token)) {
//       console.log('Token has expired');
//       // store.dispatch(resetCredentials());
//       // Dispatch action to reset credentials or perform other logout logic
//     } else {
//       console.log('Token is still valid');
//     }
//   } else {
//     console.log('No user data found in localStorage');
//     // Handle the case where no user data is found in localStorage
//   }
// }


