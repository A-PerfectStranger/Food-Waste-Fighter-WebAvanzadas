# Plan de segundo bimestre — documentación, no implementación

El primer bimestre sigue siendo Node/Express/EJS/MySQL/Socket.IO en un monolito.
Este documento describe opciones y dependencias; no afirma que React, JWT,
Gateway o microservicios ya existan. Las decisiones se validarán contra la guía
real del siguiente bimestre antes de ampliar alcance.

## Orden propuesto y criterios de salida

| Etapa futura | Cambio propuesto | Condición antes de avanzar |
| --- | --- | --- |
| 1. Contratos | Inventariar casos, permisos y errores; API versionada y contratos HTTP/eventos | Tests de contrato y paridad con historias actuales |
| 2. Frontend | Evaluar React para una interfaz separada; accesibilidad y estados de red | Paridad de formularios, teclado, alertas y auth; sin eliminar EJS hasta migrar |
| 3. Identidad | Servicio de autenticación; evaluar OAuth/OIDC o JWT corto con refresh revocable | Modelo de amenazas, rotación/revocación/audiencias/clave de firma probadas |
| 4. Separación | Extraer auth, inventario y chat detrás de contratos | Solo tras dominio estable; identidad/empresa no se aceptan del navegador |
| 5. API Gateway | Terminación TLS, rutas, autenticación de borde y límites | Cada servicio mantiene autorización; el Gateway no es una única barrera |
| 6. Datos independientes | Una base/propiedad de datos por servicio y migración por etapas | Sin joins/FKs entre bases; integridad y reconciliación explícitas |
| 7. Eventos | Outbox transaccional, consumidor idempotente y reintentos | Recuperación tras fallo, orden/duplicados y tenant isolation probados |
| 8. Escala del chat | Adaptador compartido de Socket.IO/presencia, sesión o identidad distribuida | Prueba con múltiples réplicas; revocación y límites coherentes |
| 9. Operación | Imágenes Docker por servicio, Compose de desarrollo y despliegue por ambiente | Secrets externos, readiness, cierre y rollback ensayados |
| 10. Observabilidad | Logs estructurados, métricas y trazas correlacionadas sin tokens/PII | Alertas útiles y presupuesto de retención; acceso controlado |
| 11. CI/CD | Pipeline de lint/tests/contratos/DB/seguridad/build, despliegue y rollback | Entornos aislados, migraciones compatibles y aprobaciones de release |

## Identidad, cookies y JWT

Una SPA no obliga por sí sola a sustituir cookies de sesión. Evaluar un BFF o
cookie HttpOnly antes de almacenar tokens en JavaScript. Si la guía exige JWT,
validar firma/algoritmo permitido, emisor, audiencia, expiración y tenant del
servidor; usar access tokens breves y rotación de refresh con detección de reúso.
No guardar secretos de larga duración en localStorage por conveniencia.

Cambiar sesión por JWT no resuelve CSRF/XSS ni la revocación. El handshake de
chat deberá autenticar la nueva identidad, autorizar sala/empresa y revalidar al
caducar/revocar credenciales. Los tests actuales de empresas ajenas se preservan.

## Migración de datos y consistencia

Auth será dueño de usuarios/identidad; inventario de alimentos/categorías/recetas;
chat de salas/mensajes. Las referencias externas ya no podrán depender de FK
entre servicios: habrá IDs de dominio, validación de contratos y eventos de
cambio/borrado. Migraciones aditivas, backfill verificable, lectura gradual y
rollback reemplazarán cualquier reset destructivo.

Una operación distribuida no es una transacción Prisma compartida. Diseñar
outbox y compensación cuando aporte valor; consumidores deduplican por eventId.
Las notificaciones deben poder reconciliarse con la consulta persistida. No
prometer entrega exactamente una vez.

## Rendimiento y riesgos

Usar la medición de fase 5 como línea base local, no como SLA de producción.
Definir después carga, tamaño, concurrencia y percentiles; medir el coste de red
y autenticación agregados por la separación. Revisar búsqueda de subcadenas,
cursor para inventario profundo, índices de tenant y planes con datos realistas.
Redis/broker, tracing y réplicas aumentan operación; no se añaden sin pruebas de
beneficio, presupuesto y responsables. Mantener backups, restore, pruebas de
caída/reintento y documentación de datos personales.

Los entregables del siguiente bimestre serán revisados por el equipo/docente;
ningún servicio, token o frontend de esta hoja de ruta se implementa en fase 5.
