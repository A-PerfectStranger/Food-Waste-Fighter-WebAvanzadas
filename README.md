# Food Waste Fighter — Business Edition

Aplicación académica para una cafetería o restaurante pequeño: control de alimentos, aprovechamiento de ingredientes y coordinación del personal. Se utiliza un monolito Node.js con vistas renderizadas en el servidor.

**Estado:** fases 1 y 2 fusionadas en `main` (PR #1 y #2). La fase 3 incorpora dashboard, inventario CRUD, búsqueda/paginación, categorías, caducidad y consulta de recetas, conservando las plantillas y estilos del proyecto original. El chat y las notificaciones en tiempo real corresponden a la fase 4. El estado y las evidencias se conservan en [PROGRESS.md](PROGRESS.md).

## Ejecución íntegra en GitHub Codespaces

No se requieren instalaciones en el equipo del estudiante.

1. En GitHub se abre **Code → Codespaces → Create codespace**, o se reconstruye el contenedor existente.
2. El devcontainer utiliza Node.js 24, Docker-in-Docker y el puerto3000. El comando post-create genera una `.env` privada sin sobrescritura, instala el lockfile, genera Prisma y compila CSS.
3. En la terminal de Codespaces se ejecuta:

```sh
npm run setup:env
npm ci
npm run build
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```

4. El puerto3000 se abre desde el panel **Ports**, con visibilidad privada. El servidor escucha en `0.0.0.0`. `/health` comprueba HTTP y `/ready` consulta MySQL; el arranque exige disponibilidad de la base de datos.

La ejecución de las fases 1 y 2 en Codespaces fue confirmada por la persona responsable del proyecto. Las nuevas pantallas de fase 3 se comprueban con MySQL y Chromium locales; su aceptación en el HTTPS reenviado de Codespaces queda pendiente y no se deduce de esas pruebas.

### Configuración

[.env.example](.env.example) documenta las variables. `npm run setup:env` genera cinco secretos aleatorios independientes y guarda `.env` con permisos0600. El archivo existente se conserva. Los secretos y la bandeja privada no se incluyen en Git.

| Variables | Uso |
| --- | --- |
| NODE_ENV, HOST, PORT | Modo y escucha HTTP; Node24 es obligatorio. |
| APP_ORIGIN | Origen exacto del navegador: por ejemplo `http://localhost:3000`, o la URL HTTPS reenviada del Codespace. Se utiliza en CSRF y en los enlaces de recuperación. No admite rutas, credenciales ni parámetros. |
| TRUST_PROXY | `1` para el proxy de Codespaces; `0` para HTTP directo. |
| DATABASE_URL | Conexión MySQL de la aplicación, en el propio entorno de Codespaces. |
| SESSION_SECRET | Secreto de firma de sesiones, mínimo32 caracteres; se genera automáticamente. |
| MYSQL_* | Credenciales, base y puerto del contenedor de desarrollo. |
| TEST_DATABASE_URL, TEST_MYSQL_* | Base y contenedor de pruebas independientes, puerto3307. |
| BUSINESS_TIMEZONE | Zona IANA para el día del negocio y la clasificación de caducidad (por defecto America/Guayaquil). |

El origen se deriva del Codespace al crear `.env`. Si se reutiliza un archivo de otro entorno, se actualizan APP_ORIGIN y TRUST_PROXY. En producción se exige APP_ORIGIN con HTTPS; la cookie utiliza Secure en HTTPS, HttpOnly y SameSite=Lax. El arranque imprime el origen canónico que cargó el proceso. Tras editar .env se reinicia el servidor. La protección exige siempre el token de sesión; bajo HTTPS y el proxy configurado admite la señal de navegador `Sec-Fetch-Site: same-origin` si el proxy cambia Origin. Fuera de ese caso se comprueba el origen configurado.

El volumen `mysql_data` conserva desarrollo; `docker compose stop` mantiene los datos. Las contraseñas de un volumen inicializado no cambian al editar `.env`. No se requieren reinicios destructivos ni la ejecución del SQL original.

## Autenticación y apariencia

- `/` reutiliza la portada HTML original con sus clases y estilos.
- `/auth/register` crea empresa, ADMIN, inventario y sala General en una transacción. No se aceptan roles ni empresas ajenas desde el formulario.
- `/auth/login` verifica Argon2id y regenera la sesión; `/auth/logout` solo admite POST protegido.
- `/dashboard` muestra los totales, próximos a caducar, caducados, stock bajo, alertas y recetas coincidentes. `/account` conserva la vista protegida de la cuenta.
- `/team` permite a ADMIN consultar su equipo y crear EMPLOYEE dentro de su propia empresa.
- `/auth/forgot` y `/auth/reset` completan la recuperación con token de treinta minutos y un solo uso. Solo se almacena su hash en MySQL. El cambio revoca las sesiones anteriores.

Los formularios de `login.jsp`/`registro.jsp`, la portada `landing.html` y el CSS suministrados se adaptan a EJS. Se conservan Inter, el logo, la distribución y los valores originales de verde/gris. CSS, fuente y JavaScript se sirven localmente, con CSP y sin scripts inline/CDN. Se eliminan el documento duplicado y las estadísticas sin evidencia de la portada original.

### Bandeja de correo simulada

El seed crea los usuarios ficticios `admin@semilla.example` y `equipo@semilla.example` con contraseñas iniciales aleatorias que se descartan. El acceso se establece solicitando recuperación en `/auth/forgot`, consultando el JSON generado en **`work/outbox/` desde el editor privado**, y abriendo su enlace para definir una contraseña propia.

La bandeja está ignorada por Git, sus archivos tienen permisos0600 y no se sirven por HTTP. Los enlaces no se muestran en respuestas públicas ni en logs. Se trata de una simulación académica de correo, sin servicio SMTP. El seed es idempotente y no cambia las contraseñas ya establecidas.

## Inventario, categorías, caducidad y recetas

`/inventory` permite buscar por producto o categoría, combinar filtros de categoría/estado y paginar desde MySQL (10 registros). Los alimentos tienen detalle, alta, edición y eliminación con confirmación. Se validan cantidades con hasta 3 decimales, unidades, fechas de ingreso/caducidad y mínimo de stock. ADMIN y EMPLOYEE pueden registrar/editar; ADMIN administra categorías y elimina productos. Todas las consultas y mutaciones se limitan a la empresa autenticada.

`/expiration` conserva la clasificación original: crítico de hoy a 2 días, advertencia entre 3 y 5, normal desde 6; los caducados aparecen separados. Stock bajo significa cantidad menor o igual al mínimo. `/recipes` muestra recetas persistidas, ingredientes y pasos; marca coincidencias por nombre con productos no caducados y con stock. No promete suficiencia de cantidades ni convierte unidades.

Para la demostración se recupera el acceso a la empresa ficticia del seed, que incluye un alimento y una receta. Una empresa recién registrada empieza vacía; su ADMIN crea categorías antes del primer alimento. La consulta de recetas utiliza los datos cargados por seed/persistencia; no se incluye un editor de recetas en esta fase.

Las pantallas adaptan `dashboard.jsp`, los formularios/listados de alimentos, `productosACaducar.jsp`, `recetas.jsp`, `detalleReceta.jsp` y `navbar.jsp` del ZIP suministrado. El CSS original se conserva, con fuente y compilación locales. No se inventan imágenes ni valores nutricionales ausentes del modelo. Las decisiones y permisos se detallan en [Funcionalidad empresarial](docs/BUSINESS_FUNCTIONALITY.md).

## Pruebas

```sh
npm run build
npm run db:validate
npm test
# Base temporal separada; nunca se utiliza la de desarrollo:
docker compose --profile test up -d --wait mysql-test
npm run test:db
```

Las pruebas independientes cubren HTTP, configuración, fechas civiles y validación decimal. Las de integración ejercitan MySQL, seed, arranque/apagado, autenticación, sesión, recuperación, CSRF, permisos y aislamiento; además, CRUD real, confirmación, búsquedas/paginación, métricas, caducidad, categorías, recetas y XSS. Las pruebas de WebSockets se incorporarán en fase 4.

El ejecutor rechaza bases sin sufijo `_test`, protocolos distintos de MySQL y el nombre de desarrollo antes de migrar. Solo se eliminan registros creados por las pruebas; el servicio mysql-test usa tmpfs y credenciales independientes. Los puertos3306/3307 no requieren reenvío público.

Un arranque con MySQL inaccesible puede tardar unos diez segundos: el adaptador consulta capacidades y luego disponibilidad, cada una con timeout de adquisición de cinco segundos. Se comprueba la salida segura sin listener HTTP.

Otros comandos: `npm start`, `npm run db:generate`, `npm run db:migrate` (migraciones revisadas), `npm run db:migrate:dev` (desarrollo de nuevas migraciones) y `npm run db:seed`.

## Arquitectura y documentación

```mermaid
flowchart LR
  Browser[Navegador] --> HTTP[Node24 / Express / EJS]
  HTTP --> Security[CSRF / sesiones / autorización]
  Security --> Auth[Autenticación y equipo]
  Auth --> Prisma[Prisma]
  Prisma --> DB[(MySQL8.4)]
  Security --> Sessions[PrismaSessionStore]
  Sessions --> DB
  Auth --> Mail[Bandeja privada de desarrollo]
  Security --> Business[Dashboard / inventario / categorías / recetas]
  Business --> Prisma
```

- [Plan y auditoría de migración](docs/MIGRATION_PLAN.md).
- [Modelo de datos y diagrama ER](docs/DATA_MODEL.md).
- [Autenticación, seguridad y adaptación visual](docs/AUTHENTICATION.md).
- [Funcionalidad empresarial y conservación de estilos](docs/BUSINESS_FUNCTIONALITY.md).
- [Evidencias de fase1](docs/PHASE1_VERIFICATION.md).
- [Progreso, resultados y siguientes tareas](PROGRESS.md).

Stack: Node.js24 LTS, Express5, EJS, Tailwind4, Inter, Prisma7.10.1, MySQL8.4, Argon2id, express-session, Zod, Helmet, express-rate-limit, Vitest y Supertest. Socket.IO se incorporará al mismo servidor HTTP en fase4. No se implementan SPA ni microservicios en este bimestre.

## Contexto académico y atribución

Las referencias son `Food_Waste_Fighter-main.zip` y `Guía del Proyecto AppWebAv.docx`, aportadas al proyecto. Se reutiliza el HTML/JSP/CSS visual del ZIP por solicitud expresa; no se importa su manejo de contraseñas, sus cuentas ni su SQL destructivo. La autoría original no fue indicada en los adjuntos. Inter procede de `@fontsource/inter` y se distribuye bajo SIL Open Font License, incluida en el paquete.

El equipo, sus integrantes y roles siguen pendientes de completar con información real. Las fases 4–5 incluyen WebSockets autenticados, rendimiento y documentación de defensa. No se ha creado `v1.0-b1` ni se presenta el estado actual como entrega final del bimestre.

### Uso de IA

Se utilizó OpenAI Codex como apoyo para auditoría, planificación, implementación, adaptación de plantillas, pruebas y documentación. Los resultados ejecutados y sus límites se registran en PROGRESS.md. Se requiere la revisión, comprensión y explicación del código por el equipo durante la defensa; no se atribuyen aportes individuales ni métricas no comprobadas.
