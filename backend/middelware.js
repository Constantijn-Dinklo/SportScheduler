const jwt = require('jsonwebtoken') 

const SECRET = process.env.JWT_SECRET; 

//Middelware -> move to own file 
function authenticateToken(req, res, next) { 
  const token = req.cookies.token; 
  if (!token) return res.sendStatus(401); 
  
  jwt.verify(token, SECRET, (err, user) => { 
    if (err) return res.sendStatus(403); 
    req.user = user; next(); 
  }); 
}

module.exports = { authenticateToken };




// import { Request, Response, NextFunction} from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// const SECRET = process.env.JWT_SECRET as string;

// export interface AuthenticatedRequest extends Request {
//   user?: string | JwtPayload;
// }

// //Middelware -> move to own file
// export function authenticateToken(
//   req: AuthenticatedRequest, 
//   res: Response, 
//   next: NextFunction
// ) {
//   const token = req.cookies?.token;

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, SECRET, (err: any, user: any) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }