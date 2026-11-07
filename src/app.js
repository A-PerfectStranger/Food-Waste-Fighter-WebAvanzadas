import express from 'express';
import helmet from 'helmet';
import { fileURLToPath } from 'node:url';
import { systemRoutes } from './modules/system/system.routes.js';
import { errorHandler, notFound } from './middleware/errors.js';

export function createApp({ config, checkDatabase }) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);
  app.set('view engine', 'ejs');
  app.set('views', fileURLToPath(new URL('./views/', import.meta.url)));
  const https = new URL(config.APP_ORIGIN).protocol === 'https:';
  app.use(helmet({
    contentSecurityPolicy: { directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: https ? [] : null,
    } },
    strictTransportSecurity: https ? undefined : false,
  }));
  app.use('/assets', express.static(fileURLToPath(new URL('./public/', import.meta.url))));
  app.use(express.urlencoded({ extended: false, limit: '16kb' }));
  app.use(systemRoutes({ checkDatabase }));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
