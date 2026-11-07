import { randomBytes, timingSafeEqual } from 'node:crypto';

export function csrfProtection(config) {
  const origin = new URL(config.APP_ORIGIN).origin;
  return (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    if (!req.session.csrfToken) req.session.csrfToken = randomBytes(32).toString('hex');
    res.locals.csrfToken = req.session.csrfToken;
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
    const provided = req.body?._csrf;
    const expected = req.session.csrfToken;
    const requestOrigin = req.get('Origin');
    // With Helmet's no-referrer policy Chromium uses Origin: null on native form
    // navigations. Accept that case only with same-origin Fetch Metadata; the
    // synchronizer token is still mandatory and compared below.
    const sameOrigin = !requestOrigin || requestOrigin === origin ||
      (requestOrigin === 'null' && req.get('Sec-Fetch-Site') === 'same-origin');
    if (!sameOrigin || typeof provided !== 'string' || provided.length !== expected.length ||
        Buffer.byteLength(provided) !== Buffer.byteLength(expected) ||
        !timingSafeEqual(Buffer.from(provided), Buffer.from(expected))) {
      return res.status(403).render('error', { title: 'Solicitud rechazada', message: 'La sesión del formulario caducó. Vuelve a abrir la página e inténtalo de nuevo.' });
    }
    next();
  };
}

export function authentication(database) {
  return async (req, res, next) => {
    res.locals.currentUser = null;
    if (req.session.auth) {
      const user = await database.user.findUnique({
        where: { id: req.session.auth.userId },
        select: { id: true, name: true, email: true, role: true, companyId: true, sessionVersion: true, company: { select: { name: true } } },
      });
      if (user && user.sessionVersion === req.session.auth.version) {
        req.user = user;
        res.locals.currentUser = user;
      } else {
        delete req.session.auth;
      }
    }
    next();
  };
}
export function requireUser(req, res, next) {
  if (!req.user) return res.redirect(303, '/auth/login');
  next();
}
export function requireAdmin(req, res, next) {
  if (req.user.role !== 'ADMIN') return res.status(403).render('error', { title: 'Acceso restringido', message: 'Se requiere autorización de administración.' });
  next();
}
