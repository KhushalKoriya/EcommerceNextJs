import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});

export const { setCredentials, setError } = loginSlice.actions;
export default loginSlice.reducer;

