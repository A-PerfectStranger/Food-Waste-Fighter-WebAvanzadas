# Proyecto académico — primer bimestre

## Identificación y problema

**Food Waste Fighter — Business Edition** es una aplicación para una cafetería
o restaurante pequeño. El inventario disperso dificulta conocer cantidades,
priorizar alimentos que caducan y coordinar al personal. La solución reúne
inventario, alertas por fechas civiles, recetas y comunicación del equipo.

El problema es una hipótesis de negocio que orienta el prototipo. No se han
medido pérdidas reales ni porcentajes de reducción de desperdicio. Los datos
utilizados para desarrollo, pruebas y demostración son ficticios.

- Asignatura: Aplicaciones Web Avanzadas, Escuela Politécnica Nacional.
- Periodo: `[PERIODO_ACADEMICO]` · docente: `[DOCENTE]`.
- Equipo: `[NOMBRE_EQUIPO]` · exposición: `[FECHA_Y_HORA_AMERICA_BOGOTA]`.
- Repositorio: https://github.com/A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas
- Entrega del curso: `[URL_ENTREGA_CURSO]`.

Los placeholders se conservan por solicitud de la persona responsable. No
representan integrantes, fechas ni aportes realizados.

## Objetivo general

Desarrollar y verificar, para el primer bimestre, un monolito web que permita a
ADMIN y EMPLOYEE de una misma cafetería administrar alimentos, identificar su
caducidad, consultar recetas y coordinarse en tiempo real, con persistencia
MySQL y separación de datos entre empresas.

## Objetivos específicos y medición

| Objetivo | Criterio verificable | Evidencia |
| --- | --- | --- |
| Proteger cuentas y recuperar acceso | Registro/login/logout reales; hash Argon2id; token de recuperación de un uso y 30 minutos; rechazo de reutilización/concurrencia | `tests/auth.integration.test.js`, AUTHENTICATION.md |
| Gestionar el inventario | Crear/consultar/editar/eliminar con confirmación; 7 campos; decimales exactos y fechas válidas | `tests/business.integration.test.js` |
| Reducir el esfuerzo de consulta | Página de 10 alimentos, búsqueda por nombre/categoría y orden estable; medir p50/p95 con 1000 registros ficticios | PERFORMANCE.md, `npm run measure:queries` |
| Priorizar productos | Distinguir caducados, crítico 0–2 días, advertencia 3–5, normal 6+ y stock bajo | `tests/business.test.js`, dashboard e integración |
| Coordinar a dos personas | Entrega en vivo, historial tras reconexión, presencia y aviso de inventario sin recarga | `tests/chat.integration.test.js`, `npm run verify:browser` |
| Aislar empresas | Rechazar IDs, salas, cursores y datos de identidad ajenos en HTTP, Socket.IO y claves foráneas | Suites auth/business/chat |
| Proporcionar acceso usable | Revisar páginas a 1280 y 320 px, teclado, overflow y reglas axe A/AA; documentar límites | QUALITY_REVIEW.md |

Son objetivos del sistema, no afirmaciones sobre beneficios económicos ya
medidos. Un estudio posterior deberá establecer una línea base de desperdicio,
periodo de observación y controles antes de calcular un ahorro.

## Historias de usuario priorizadas

| ID / prioridad | Historia | Aceptación y comprobación |
| --- | --- | --- |
| HU01 / obligatoria | Como responsable, quiero registrar mi negocio para crear su cuenta ADMIN e inventario. | Alta atómica, correo normalizado único; no admite rol/empresa inyectados. Auth integración. |
| HU02 / obligatoria | Como persona registrada, quiero entrar y salir con una sesión segura. | Argon2id, rotación, cookie persistida, logout POST y rutas protegidas. Auth integración. |
| HU03 / obligatoria | Como persona que perdió acceso, quiero cambiar mi contraseña con un enlace privado. | Respuesta pública genérica, hash de token, caducidad, consumo único y revocación. Auth integración. |
| HU04 / obligatoria | Como ADMIN, quiero incorporar empleados del negocio. | Solo ADMIN y misma empresa; EMPLOYEE no puede dar altas. Auth integración. |
| HU05 / obligatoria | Como empleado, quiero registrar y corregir alimentos con cantidades precisas. | Validación HTML5/JS/Zod, categoría autorizada, fechas ordenadas, persistencia Decimal. Business integración. |
| HU06 / obligatoria | Como ADMIN, quiero eliminar un producto con confirmación. | GET no borra, POST con CSRF y checkbox; usuario ajeno o EMPLOYEE rechazado. Business integración. |
| HU07 / obligatoria | Como empleado, quiero encontrar alimentos por nombre/categoría y página. | Filtros combinables; SQL skip/take de 10 y orden caducidad/ID. Business integración. |
| HU08 / obligatoria | Como responsable, quiero ver alertas y existencias bajas al entrar. | Cuatro métricas, límites de días y fecha del negocio comprobados. Business suites. |
| HU09 / obligatoria | Como empleado, quiero consultar ingredientes y pasos de recetas. | Solo recetas de mi empresa; coincidencias excluyen stock vacío/caducado. Business integración. |
| HU10 / obligatoria | Como empleado, quiero conversar con otra persona de mi negocio. | Sesión/token en handshake, General autorizada, mensaje persistido y visible sin recarga. Chat integración. |
| HU11 / obligatoria | Como responsable, quiero ver quién está conectado y cambios relevantes. | Un usuario se cuenta una vez; avisos de inventario no se filtran a otra empresa. Chat/browser. |
| HU12 / obligatoria | Como integrante, quiero ejecutar y demostrar desde Codespaces. | Devcontainer/Compose/scripts, instrucciones, aceptación del propietario y registro honesto de trazas. README/PROGRESS/DEFENSE_DEMO. |
| HU13 / posterior | Como responsable, quiero medir desperdicio/ahorro real. | Requiere datos y estudio; no implementada en este bimestre. |
| HU14 / segundo bimestre | Como equipo técnico, quiero evaluar frontend y servicios separados. | Solo plan de transición: second-bimester-roadmap.md. |

## Propuesta de cronograma

Esta distribución es una propuesta por semanas relativas; no inventa fechas de
trabajo real. El historial Git y PROGRESS.md conservan los hechos ejecutados.

| Semana propuesta | Trabajo y dependencia | Producto verificable |
| --- | --- | --- |
| S1 | Auditoría Java/guía, alcance y entorno | Matriz de migración, Express/Prisma/MySQL y smoke tests |
| S2 | Modelo y seguridad sobre S1 | ER, migraciones, autenticación, sesiones/recuperación |
| S3 | Negocio sobre S2 | CRUD, dashboard, categorías/recetas/caducidad |
| S4 | Coordinación sobre S2–S3 | Chat persistido, presencia, aislamiento y avisos |
| S5 | Calidad sobre S1–S4 | Regresión, accesibilidad, medición y documentos |
| S6 | Cotejo oficial, ensayo y entrega | Nombres/aportes reales, evidencia, exposición y publicación final |

## Reparto propuesto para 4–5 personas

| Integrante por completar | Responsabilidad propuesta | Aporte real / commits / exposición |
| --- | --- | --- |
| `[INTEGRANTE_1]` | Coordinación, problema, objetivos y trazabilidad | `[APORTE_REAL_1]` / `[COMMITS_1]` / bloque 1 |
| `[INTEGRANTE_2]` | Modelo, autenticación y seguridad | `[APORTE_REAL_2]` / `[COMMITS_2]` / bloque 2 |
| `[INTEGRANTE_3]` | Inventario, dashboard, recetas y accesibilidad | `[APORTE_REAL_3]` / `[COMMITS_3]` / bloque 3 |
| `[INTEGRANTE_4]` | Chat, sesiones de socket y aislamiento | `[APORTE_REAL_4]` / `[COMMITS_4]` / bloque 4 |
| `[INTEGRANTE_5_OPCIONAL]` | Pruebas, rendimiento y demostración | `[APORTE_REAL_5]` / `[COMMITS_5]` / bloque 5 |

Con cuatro integrantes se redistribuye el quinto bloque según DEFENSE_DEMO.md.
La propuesta no prueba autoría ni aportes. Los commits deben ser trabajo real:
no se crean commits vacíos para aparentar participación.

## Declaración de IA y atribución

OpenAI Codex asistió en auditoría, migración, implementación, adaptación de
plantillas, pruebas y documentación. La IA no es un integrante del grupo ni
una fuente de resultados no ejecutados. El equipo debe revisar, comprender y
poder defender cada cambio. Las pruebas y sus límites constan en PROGRESS.md.
HTML/JSP/CSS originales proceden del ZIP aportado; no se inventa su autoría.
Inter se distribuye bajo SIL Open Font License dentro de `@fontsource/inter`.
