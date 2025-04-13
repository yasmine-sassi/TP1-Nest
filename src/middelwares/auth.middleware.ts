
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config(); // charge les variables depuis .env

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['auth-user'] as string;
        const secret = process.env.JWT_SECRET;

        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        if (!secret) {
            return res.status(500).json({ message: 'Clé secrète JWT manquante dans la configuration' });
        }

        try {
            const decoded = verify(token, secret);
            req['user'] = decoded;
            next();
        } catch {
            return res.status(403).json({ message: 'Token invalide' });
        }
    }
}