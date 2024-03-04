import axios from 'axios';

export const refreshAccessToken = async (token,refreshToken) => {
  try {
    const res = await axios.get('/api/auth', {
      headers: {
        'Authorization': `Bearer ${token}`,
        withCredentials: true,
        credentials: 'include',
      }
    });
    const accessToken = res.config.headers.Authorization;
    console.log(accessToken,"accessToken");
    return res
  } catch (error) {
    console.error('Failed to refresh access token:', error.response.data.message);
  }
};
