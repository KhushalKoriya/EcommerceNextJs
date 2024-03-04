import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req, "req");
    console.log(req.cookies, "req.cookies");
    console.log(req.headers.authorization, "req.headers");
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            const token = req.headers.authorization.split('Bearer ')[1];
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as JwtPayload;
            console.log(verified, "verified");

            const user = await User.findById(verified.id);
            console.log(user, "user");

            if (!user) {
                return res.json(false);
            }

            return res.json(true);
        }
    }
    catch (error) {
        const refreshToken = req.cookies.refreshToken;
        console.log("Refresh token:", refreshToken);
        try {
            if (!refreshToken) {
                return res.status(403).json({ message: 'Refresh token not provided' });
            }
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret);
            console.log(decoded, "decoded");
            if (typeof decoded === 'string' || !decoded.id) {
                throw new Error('Invalid decoded token');
            }
            const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1m' });
            console.log("New access token:", accessToken);
            res.status(200).json({ success: true, accessToken });
        } catch (error) {

            res.status(401).json({ message: 'Invalid refresh token' });
        }
    }
}
