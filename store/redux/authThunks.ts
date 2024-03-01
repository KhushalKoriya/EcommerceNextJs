import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCredentials } from './loginSlice';
import Cookies from 'js-cookie';
interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, {  dispatch, rejectWithValue  }) => {
    console.log(credentials, "credentials");

    try {
      const response = await axios.post('/api/login', credentials);
      console.log(response ,"response");
      
      const data = response.data;

      if (data.success) {
        Cookies.set('refreshToken', data.refreshToken, { expires: 7, path: '/' });
        localStorage.setItem("user", JSON.stringify(response.data.sessUser))
        dispatch(setCredentials(response.data.sessUser));
        
        return data.sessUser;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue('An error occurred while logging in');
    }
  }
);

