# Matriz de requisitos y cotejo de la rúbrica

## Fuentes y alcance de la comprobación

La especificación versionada es [PROJECT_SPEC.md](PROJECT_SPEC.md). La auditoría
histórica de la guía se conserva en MIGRATION_PLAN.md y PROGRESS.md, donde se
registra una rúbrica de primer bimestre de **20 puntos**.

**El DOCX oficial no está disponible en este executor durante la fase 5.** No se
han vuelto a comprobar sus rótulos, versión ni pesos individuales. Esta matriz
cubre los requisitos conservados en la especificación, pero no se presenta
como transcripción literal ni como calificación obtenida. El equipo debe cotejar
cada fila con `[VERSION_GUIA_OFICIAL]`, consignar `[CRITERIO_OFICIAL]` y
`[PESO_OFICIAL]`, y verificar que la suma sea 20. No se reparten puntos inventados.

Estado técnico: implementado/verificado localmente según evidencias enlazadas.
Estado de entrega: documentos y procedimientos preparados; autoría real,
cotejo oficial, exposición y envío dependen del equipo.

| ID | Requisito del primer bimestre | Implementación y evidencia | Estado / límite |
| --- | --- | --- | --- |
| R01 | Problema de una PYME y objetivos medibles | ACADEMIC_BRIEF.md, contexto/objetivos/criterios | Preparado; beneficios de negocio no medidos |
| R02 | Monolito Node 24 + Express/EJS | src/server.js, app.js; ARCHITECTURE.md | Implementado, sin SPA/microservicios |
| R03 | HTML5/Tailwind/JS, interfaz coherente | src/views, estilos locales; verificación browser/axe | Revisado en alcance declarado; no certificación WCAG |
| R04 | MySQL/Prisma, relaciones e índices | schema y migraciones; DATA_MODEL.md; suites de DB | Persistencia real, tenant FKs y CHECKs |
| R05 | Registro validado y duplicado | auth.validation/service/routes; auth integración | Caso válido/duplicado/inyección verificados |
| R06 | Login con hash y logout | Argon2id, sesiones persistentes, rotación y logout POST | Verificado; nunca contraseñas en claro |
| R07 | Recuperación expirable de un uso | PasswordResetToken, outbox privado y consumo atómico | Verificado, correo simulado explícito |
| R08 | Roles y rutas protegidas | middleware, equipo, negocio; auth/business integración | ADMIN/EMPLOYEE y empresa del servidor |
| R09 | Dashboard y navegación CRUD/chat | dashboard.routes y EJS/navbar | Cuatro métricas, alertas, enlaces funcionales |
| R10 | CRUD con más de 5 atributos | FoodItem: nombre/cantidad/unidad/categoría/ingreso/caducidad/mínimo | Alta/lista/ID/edición/borrado confirmado |
| R11 | Validación cliente/servidor y errores | HTML5, inventory.js/auth.js, Zod | Fechas/decimales/campos extra y mensajes comprobados |
| R12 | Búsqueda, SQL paginado e índices | inventory.repository; tests; PERFORMANCE.md | 10 por página; contains no equivale a índice de prefijo |
| R13 | Recetas/caducidad útiles del original | recipes, expiration y BUSINESS_FUNCTIONALITY.md | Pasos/ingredientes; días civiles y stock útil |
| R14 | Socket.IO mismo servidor y handshake | chat.socket + sesión/token/origen; REALTIME.md | Anónimo rechazado y revocación vigente |
| R15 | Dos usuarios, sala, historial y presencia | ChatRoom/ChatMessage; chat integración/browser | Persistido, paginado y aislado por empresa |
| R16 | Validación y XSS en eventos | Zod estricto, escape EJS/textContent | Límites y datos de identidad falsos rechazados |
| R17 | Aviso adicional sin recarga | inventory:changed tras guardar; banner | Dos usuarios/empresa distinta comprobados |
| R18 | CSRF, Helmet, cookies y configuración | security/env/session-store; QUALITY_REVIEW.md | Política proxy acotada; no secretos publicados |
| R19 | Cinco pruebas relevantes, preferible ocho o más | Suites system/auth/business/chat/database/tooling | Se supera mínimo; conteos actuales en PROGRESS |
| R20 | Base de pruebas separada | Compose mysql-test, guard compartido de scripts | Sin reset de desarrollo, limpieza dirigida |
| R21 | Rendimiento reproducible | measure:queries; JSON y PERFORMANCE.md | Latencia medida, condiciones y límites explícitos |
| R22 | Codespaces íntegro desde navegador | devcontainer, Compose, README | Aceptación del dueño registrada; trazas detalladas de defensa por adjuntar |
| R23 | Diagramas, historias y arquitectura | ARCHITECTURE, DATA_MODEL, ACADEMIC_BRIEF | Documentados contra código vigente |
| R24 | Cronograma y 4–5 integrantes | ACADEMIC_BRIEF, DEFENSE_DEMO | Propuesta y placeholders autorizados; aportes reales pendientes |
| R25 | Exposición 15 minutos + 5 preguntas | DEFENSE_DEMO.md | Guion/tiempos y participación preparados; exposición no realizada |
| R26 | Declaración IA, atribución e integridad | README/ACADEMIC_BRIEF/RELEASE_CHECKLIST | No se inventan commits, nombres, métricas ni entrega |
| R27 | Plan de segundo bimestre | second-bimester-roadmap.md | Solo documentación, sin implementar ese alcance |
| R28 | Repositorio/entrega y versión final | README y RELEASE_CHECKLIST | Repositorio público; equipo debe enviar enlace y validar release |

## Ocho casos esenciales para localizar durante la defensa

| Caso | Archivo de prueba |
| --- | --- |
| Registro válido y rechazo duplicado | tests/auth.integration.test.js |
| Contraseña incorrecta y ruta anónima | tests/auth.integration.test.js |
| Recuperación: expiración, reutilización, concurrencia | tests/auth.integration.test.js |
| Validación del alimento y persistencia decimal | tests/business.integration.test.js |
| Búsqueda y segunda página real | tests/business.integration.test.js |
| Rechazo de handshake anónimo | tests/chat.integration.test.js |
| IDs/salas/cursores/identidad entre empresas | tests/business.integration.test.js, tests/chat.integration.test.js |
| Persistencia e intercambio entre dos clientes | tests/chat.integration.test.js |

## Cierre del cotejo oficial

| Dato de integridad | Por completar con la fuente oficial |
| --- | --- |
| Documento/versión y página de rúbrica | `[GUIA_OFICIAL_Y_PAGINA]` |
| Correspondencia filas R01–R28 → criterio oficial | `[MAPEO_CRITERIOS_OFICIALES]` |
| Pesos de criterios y suma | `[PESOS_OFICIALES_CON_SUMA_20]` |
| Observaciones/docente | `[OBSERVACIONES_REALES]` |

La suma histórica de 20 puntos no significa que el proyecto haya obtenido 20/20.
