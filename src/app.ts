import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { healthRouter } from './routes/health.routes';
import { ordersRouter } from './routes/orders.routes';
import { errorHandler } from './middleware/errorHandler';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());
  if (env.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

  app.use('/health', healthRouter);
  app.use('/api/orders', ordersRouter);

  app.use(errorHandler);

  return app;
}
