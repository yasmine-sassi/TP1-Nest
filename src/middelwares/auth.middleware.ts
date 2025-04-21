
// src/middlewares/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['auth-user'] as string;
        const secret = process.env.JWT_SECRET;

        if (!token) {
            return res.status(401).json({ message: 'Token manquant dans le header auth-user' }); //throw unauthorized except
        }

        if (!secret) {
            return res.status(500).json({ message: 'Clé secrète JWT manquante' }); //internal service
        }

        try {
            const decoded = verify(token, secret) as { userId?: number };
            if (!decoded.userId) {
                return res.status(403).json({ message: 'Token invalide : userId manquant' });
            }

            req['user'] = decoded;
            next();
        } catch {
            return res.status(403).json({ message: 'Token invalide' });
        }
    }
}
