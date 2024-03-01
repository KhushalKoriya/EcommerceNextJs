
import { NextApiRequest, NextApiResponse } from 'next';
import "../../../utils/dbConnection";
import User from '../../../models/User';
interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body,"req.body");
    
    try {
      console.log("fsfdf");
      
        const { username, email, password, confirmPassword }: RegisterData = req.body;
console.log(req.body,"datata");

        // Check if passwords match
        if (password !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }
  
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
        }
  
        // Create the new user
        const newUser = await User.create({
          username,
          email: email.toLowerCase(),
          password,
          confirmPassword
        });
  console.log(newUser,"newUser");
  
        // Check if the new user was created successfully
        if (newUser) {
          return res.status(200).json({ message: 'User created successfully', user: newUser });
        } else {
          return res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  } else {
    // Return 405 Method Not Allowed for other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
