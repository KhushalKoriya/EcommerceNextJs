import "../../../utils/dbConnection";
import User from '../../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { Secret } from 'jsonwebtoken';
interface Sessions {
  id: string;
  username: string;
  token: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      let isUserLoggedIn = await User.findOne({
        $and: [
          {
            email: email,
            password: password
          },
        ],
      });
      if (isUserLoggedIn) {
        const token = jwt.sign({ id: isUserLoggedIn._id }, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: "1m" });
        const refreshToken = jwt.sign({ id: isUserLoggedIn._id }, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: "7d" });
        const sessUser: Sessions = {
          id: isUserLoggedIn._id,
          username: isUserLoggedIn.username,
          token,
        };
        res.status(200).json({ success: true, sessUser, refreshToken });
      } else {
        res
          .status(400)
          .send({ message: "User Not found.Please Sign Up in the System!." });
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).end();
  }
}
