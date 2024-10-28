import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any; // Ajoutez les propriétés supplémentaires que vous attendez dans votre requête
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    // Vérifiez le token et ajoutez l'utilisateur à la requête
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret"); // Assurez-vous que cette fonction existe et fonctionne correctement
    req.user = decoded ;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;