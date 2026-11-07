# Revisión de calidad, seguridad y accesibilidad — fase 5

## Alcance y resultado

Se revisó el monolito de fases 1–4 en `main` (`e6dfe81`) y los cambios de fase 5.
La aceptación del propietario de fase 4 se mantiene cerrada. Esta revisión
combina inspección de código, regresión sobre MySQL separado, navegador real,
axe y verificaciones dirigidas de teclado/DOM. No es una auditoría externa,
un pentest exhaustivo ni certificación WCAG.

La regresión de fase 5 suma **106 pruebas: 50 independientes y 56 de integración**.
Se añaden siete casos al guard de base de pruebas, compartido por test:db,
verify:browser y measure:queries. Los casos de negocio/auth/socket heredados
siguen ejecutándose contra persistencia real. Los resultados y comandos finales
se conservan en PROGRESS.md y [evidence/browser-quality.json](evidence/browser-quality.json).

## Seguridad: revisión por frontera

| Frontera / amenaza | Evidencia inspeccionada | Resultado y límite |
| --- | --- | --- |
| Credenciales/brute force | passwords.js y auth.validation/routes; pruebas de login/duplicados/límite | Argon2id 19 MiB/t2/p1; normalización, mensajes genéricos y límite local por IP. No MFA ni resistencia DDoS afirmada. |
| Fijación/revocación de sesión | beginSession, PrismaSessionStore, auth middleware, socket activeUser | Rotación, expiración, versión actual y logout/reset revocan; sockets no guardan copia antigua. Barrido de presencia cada 15 s. |
| Reset de contraseña | auth.service/reset-mail; expiración/reúso/concurrencia | Token aleatorio 256 bits, hash en DB, 30 min, consumo atómico, outbox privado. Correo sigue siendo simulación. |
| CSRF/origen detrás de proxy | security.js y socketOriginAllowed; negativos de origin/token/cookie/proxy | Token obligatorio; excepción same-origin solo bajo condiciones documentadas. Headers de Fetch Metadata no sustituyen autenticación. |
| Acceso entre empresas/roles | queries scoped, requireAdmin, FKs, suites auth/business/chat | IDs, categorías, salas/cursores e identidad falsa rechazados; roles/empresa se recargan. |
| XSS/SQL | EJS, public/realtime.js, repositorios y Prisma.sql | Datos escapados/textContent; SQL parametrizado. Includes EJS sin escape solo para parciales de código confiable. No queryRawUnsafe/innerHTML de datos. |
| Eventos y abuso | chat schemas, conexión/eventos/buffer, pruebas reales | 1–2000 caracteres, sin controles, 5 sockets/user, 100/company, 60 eventos/min/user y 16 KiB. Contadores locales; no HA/antiabuso distribuido. |
| Errores/config/secretos | env.js, errors.js, startup, form diagnostics | Errores genéricos y referencias sin credenciales. .env/outbox/work/generated ignorados. Check de valores privados antes de push. |
| Automatización con DB | guard compartido y pruebas tooling; limpieza de fixtures | Rechazo previo a migrar/crear datos si falta base independiente `_test`; URL inválida nunca se refleja en error. No reset de desarrollo. |
| Dependencias | lockfile, npm audit producción | Cero vulnerabilidades reportadas en la ejecución registrada; no certifica seguridad del sistema ni ausencia futura de avisos. |

La búsqueda estática inspeccionó usos de SQL sin parámetros, DOM interpretado,
MemoryStore, registros de consola y salidas EJS. Los logs existentes registran
mensajes seguros/origen público y banderas de diagnóstico; no cuerpos, cookies,
sesiones, tokens ni enlaces de reset. Que una búsqueda no encuentre un patrón
no prueba por sí sola la ausencia de vulnerabilidades.

## Accesibilidad: hallazgos y corrección

El baseline estable encontró cuatro clases de reglas en 32 combinaciones de
página/tamaño: `color-contrast`, `landmark-one-main`, `region` y `link-name`.
Se esperó el fin del fade-in antes de medir: la opacidad transitoria no se tomó
como evidencia del contraste final.

- Blanco sobre verde600 (#16a34a): **3.30:1**, insuficiente para texto normal.
  Los botones/acciones, números decorativos de pasos y textos verdes normales usan ahora el verde700 existente
  (#15803d): **5.02:1** frente a blanco. El logo grande y elementos decorativos
  conservan verde600. No se cambia legacy.css ni la fuente Inter.
- Login/registro/recuperación/reset disponen de un elemento main, sin cambiar
  campos ni acciones del formulario.
- El enlace del logo de portada tiene nombre accesible aun cuando se oculta el
  texto en móvil.

El escaneo posterior cubre **40 combinaciones**: seis rutas públicas y catorce
rutas protegidas, a **1280×900 y 320×740**, con datos ficticios que incluyen
alimento/receta/ingrediente y ADMIN/EMPLOYEE. Se ejecutan reglas axe A/AA de WCAG
2/2.1 y best-practice: **0 infracciones detectadas**, **0 overflow horizontal**,
**0 errores JS** y **0 peticiones HTTP externas**. Los resultados incompletos de
axe se conservan y no se convierten en un aprobado automático. En dos escaneos
de detalle de receta axe solicita revisión del símbolo de ingrediente y los
números de paso (aria-hidden). Se revisaron como indicadores redundantes:
la disponibilidad también se expresa por texto y los pasos son una lista
ordenada; los números decorativos usan blanco/verde700 (5.02:1).

Se verificó teclado real: primer Tab al enlace de salto y Enter abre/cierra
menú móvil con aria-expanded coherente. Se inspeccionaron capturas de chat en
escritorio/móvil y el foco visible. Los avisos tienen texto y role=status, los
estados de caducidad no dependen solo de color y las tablas tienen caption,
encabezados y región desplazable. Falta una evaluación completa con lector de
pantalla, zoom/preferencias y personas usuarias: la revisión automatizada no la
sustituye.

## Reproducción de navegador

```sh
npm ci
npm run build
npm run test:db
# Si Codespaces no dispone de navegador:
npx playwright install --with-deps chromium
npm run verify:browser
```

El comando crea un servidor HTTP efímero en el mismo proceso con app y Socket.IO
reales y MySQL test, con origen propio; no altera .env ni el servidor del usuario.
Crea empresas/identidades aleatorias, entra por formularios nativos y limpia sus
registros/sesiones al terminar. Guarda JSON/capturas nuevos en work/ ignorado.
El prefijo de reportes es evidencia de trabajo, no datos de personas reales.
La comprobación protege dos usuarios de una empresa frente a otra, confirma
historial tras recarga, WebSocket observado y aviso de inventario sin navegar.

Las pruebas de integración cubren además cookies HTTPS/proxy, CSRF, rechazo de
sockets, validación, XSS, revocación y shutdown. El proxy HTTPS/wss de fase 4
se repitió con las plantillas/estilos de fase 5: Secure/HttpOnly, wss,
aislamiento y flujos nativos correctos, sin errores de página/CSP. Sigue siendo
evidencia local; el acta de Codespaces real está disponible para completar
en DEFENSE_DEMO.md sin inventar trazas ni reabrir aquella aceptación.

## Límites y seguimiento

- Fuente oficial de rúbrica: DOCX ausente; cotejar pesos antes de afirmar una nota.
- Identidad/aportes/fecha/curso: placeholders autorizados por el propietario.
- Rendimiento: línea base sintética en serie, no prueba de carga o SLA.
- Sesiones/historial persistentes, límites/presencia en memoria: solo un proceso.
- Entrega de avisos puede perderse; no hay outbox/event log ni exactamente una vez.
- Search contains puede recorrer filas; ver el plan honesto de PERFORMANCE.md.
- No existe evidencia de exposición/envío al curso/tag final creada por esta revisión.
