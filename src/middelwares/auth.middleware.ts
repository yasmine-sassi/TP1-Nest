/*
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'] as string;
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      req['user'] = decoded;
      next();
    } catch {
      return res.status(403).json({ message: 'Token invalide' });
    }
  }
}

 */
