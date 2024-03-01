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
console.log(res,"jbjsbjbsjbj");
    const accessToken = res.config.headers.Authorization;
    console.log(accessToken,"accessToken");
  } catch (error) {
    console.error('Failed to refresh access token:', error.response.data.message);
  }
};
