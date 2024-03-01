import "../../../utils/dbConnection";
import User from '../../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { Secret } from 'jsonwebtoken';
// import { getSession } from 'next-auth/client';
import { getSession } from "next-auth/react";
import { Session } from 'next-auth';
import { add } from 'date-fns';
interface Sessions {
  id: string; // Assuming id is of type string
  username: string;
  token: string;
  // expires: string; // Assuming expires is a string representing a date
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // let session: Session | null = await getSession({ req });
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
    //   const db = await connectToDatabase();
    //   const collection = db.collection('users');

      // Find user by email and password
      let isUserLoggedIn = await User.findOne({
        $and: [
          {
            email: email,
            password:password
          },
        ],
      });
      if (isUserLoggedIn) {
        // const expirationTime = add(new Date(), { minutes: 1 });
        const token = jwt.sign({ id: isUserLoggedIn._id }, process.env.ACCESS_TOKEN_SECRET as Secret,{expiresIn :"1m"});
        const refreshToken = jwt.sign({ id: isUserLoggedIn._id }, process.env.REFRESH_TOKEN_SECRET as Secret,{expiresIn :"7d"});
        const sessUser: Sessions = {
          id: isUserLoggedIn._id,
          username: isUserLoggedIn.username,
          token,
          // expires: expirationTime.toISOString()
        };
        // session = sessUser;
        res.status(200).json({ success: true, sessUser ,refreshToken  });
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
