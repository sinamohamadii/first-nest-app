import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.time('Request-Response Cycle');
    res.on('finish', () => {
      console.timeEnd('Request-Response Cycle');
    });
    next();
  }
}
