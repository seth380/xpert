import type { NextFunction, Request, Response } from 'express';

// Express requires a 4-arg signature to recognize this as an error handler.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
}
