// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// // import User, from '../models/userModel';
// import { IUser } from '../utils/interfaces/interface';

// const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

//     const {}=dependencies
//     try {
//         const token: string | undefined = req.cookies.jwt;

//         if (!token) {
//             res.status(401).json({ error: "Unauthorized - No token provided" });
//             return;
//         }

//         const decoded: any = jwt.verify(token, process.env.ACCESS_SECRET_KEY || '');

//         if (!decoded) {
//             res.status(401).json({ error: "Unauthorized - Invalid token" });
//             return;
//         }



//         if (!user) {
//             res.status(404).json({ error: "User not found" });
//             return;
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.log("Error in protectedRoute middleware", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export default protectRoute;
