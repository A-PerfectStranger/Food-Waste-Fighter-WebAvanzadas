# Proyecto: Food Waste Fighter — Business Edition

Actúa como un ingeniero de software senior especializado en Node.js, Express, arquitectura modular, bases de datos relacionales, seguridad web, WebSockets y desarrollo en GitHub Codespaces.

Tu objetivo es **migrar y transformar el proyecto existente Food Waste Fighter** para que cumpla todos los lineamientos del **primer bimestre de la asignatura Aplicaciones Web Avanzadas de la Escuela Politécnica Nacional**.

Trabajarás directamente sobre el repositorio, creando y modificando archivos reales, no solamente proporcionando ejemplos de código.

## 1. Analiza los archivos antes de comenzar

Dispondrás de:

- El código original: `Food_Waste_Fighter-main.zip` o su carpeta extraída.
- La guía académica: `Guía del Proyecto AppWebAv.docx`.

Antes de programar:

1. Analiza el código original: Java Servlets, JSP, JPA, MySQL, controladores, DAO, entidades y vistas.
2. Identifica las funcionalidades existentes y las reglas del negocio que pueden reutilizarse.
3. Lee la guía académica, especialmente los requisitos y la rúbrica del primer bimestre.
4. Crea `docs/migration-plan.md` con una matriz que relacione cada funcionalidad original con su equivalente en el nuevo sistema.
5. Identifica los requisitos faltantes y los riesgos de seguridad.

No hagas una traducción literal de Java a JavaScript. Implementa una nueva arquitectura que conserve el comportamiento útil del proyecto original.

## 2. Contexto de negocio

Nombre: **Food Waste Fighter — Business Edition**.

Tipo de PYME: cafetería o restaurante pequeño.

Problema: los negocios alimentarios sufren pérdidas por el vencimiento de productos, el desconocimiento del inventario disponible y la falta de coordinación entre sus empleados.

Objetivo: desarrollar una plataforma web que permita controlar inventarios, identificar alimentos próximos a caducar, aprovechar ingredientes mediante recetas y coordinar al personal mediante comunicación en tiempo real.

La implementación deberá funcionar con datos ficticios y permitir posteriormente la administración de varias empresas con separación de datos.

## 3. Stack obligatorio del primer bimestre

Utiliza:

- JavaScript con Node.js 24 LTS.
- Express para backend, rutas HTTP y lógica de negocio.
- EJS para vistas HTML renderizadas en el servidor.
- HTML5, Tailwind CSS y JavaScript para la interfaz.
- MySQL 8 para persistencia.
- Prisma ORM, utilizando una versión estable y compatible con Node.js.
- Socket.IO para WebSockets.
- express-session y un almacén de sesiones persistente.
- Argon2id para almacenar contraseñas.
- Zod para validaciones.
- Vitest y Supertest para pruebas.
- Docker Compose para la base de datos.
- GitHub Codespaces como entorno de desarrollo.

No uses React, Vue, Angular, Next.js ni una SPA en el primer bimestre.

No utilices Firebase, Pusher, Ably u otro proveedor externo para sustituir el servidor WebSocket.

**La aplicación debe ser un monolito:** un único proceso de aplicación Express integra vistas, rutas, lógica de negocio, persistencia y Socket.IO. MySQL puede ejecutarse en otro contenedor como dependencia de base de datos.

## 4. Modelo de datos

Diseña modelos Prisma para:

- Company: empresa, nombre, descripción y datos generales.
- User: usuario, nombre, email, contraseña hasheada, rol, empresa y fecha de registro.
- Inventory: inventario perteneciente a una empresa.
- FoodItem: alimento, nombre, cantidad decimal, unidad, categoría, fecha de ingreso, fecha de caducidad, stock mínimo y empresa/inventario.
- Category: categoría de alimento.
- Recipe: recetas existentes adaptadas al contexto empresarial.
- RecipeIngredient: ingredientes de las recetas.
- ChatRoom: sala de chat, relacionada con la empresa.
- ChatMessage: emisor, sala, contenido y fecha.
- PasswordResetToken: hash del token, usuario, caducidad y fecha de consumo.

Considera una entidad adicional para movimientos de inventario solamente si aporta valor y no retrasa los requisitos obligatorios.

Define claves foráneas, restricciones, índices, unicidad y relaciones apropiadas.

No importes ciegamente el SQL original: contiene instrucciones destructivas que deben analizarse antes de cualquier migración.

## 5. Requisitos funcionales obligatorios

### Autenticación

Implementa:

- Registro con validación de nombre, email y contraseña.
- Inicio de sesión contra MySQL.
- Hash Argon2id y verificación segura.
- Cierre de sesión.
- Rutas protegidas.
- Roles ADMIN y EMPLOYEE.
- Recuperación de contraseña mediante token aleatorio de un solo uso y caducidad.
- Almacenamiento únicamente del hash del token.
- Simulación del envío por correo en desarrollo, sin mostrar el token en respuestas públicas.
- Invalidación del token después de utilizarlo.

### Dashboard

Debe mostrar:

- Total de alimentos registrados.
- Productos próximos a caducar.
- Productos caducados.
- Productos con stock bajo.
- Acceso al CRUD y chat.
- Notificaciones relevantes.

### CRUD principal

Implementa creación, listado, búsqueda por nombre o categoría, consulta por ID, actualización y eliminación con confirmación.

Debe incluir:

- Validación en cliente y servidor.
- Paginación real desde la base de datos.
- Índices para los campos de búsqueda.
- Separación de datos por empresa.
- Control de permisos.
- Mensajes claros de éxito y error.

### Chat y WebSockets

Socket.IO debe utilizar el mismo servidor HTTP de Express.

Implementa:

- Autenticación de conexiones mediante sesión durante el handshake.
- Rechazo de usuarios no autenticados.
- Al menos una sala general por empresa.
- Comunicación en tiempo real entre dos usuarios conectados simultáneamente.
- Historial persistido en MySQL.
- Lista de usuarios conectados.
- Validación del contenido, longitud y formato de los mensajes.
- Protección contra XSS.
- Notificación adicional cuando se agregue un alimento próximo a caducar o se modifique un registro relevante del inventario.
- Aislamiento entre empresas: ningún usuario puede consultar mensajes o inventarios ajenos.

El código debe permitir explicar el handshake, los eventos de Socket.IO y el transporte WebSocket durante la defensa.

### Recetas y alertas

Migra las funcionalidades útiles de Food Waste Fighter:

- Listado de recetas.
- Detalle e ingredientes.
- Clasificación de alimentos según su proximidad al vencimiento.
- Alertas visuales de caducidad.

Evita funcionalidades innecesariamente complejas para el primer bimestre.

## 6. Seguridad y rendimiento

Implementa:

- Validación cliente y servidor.
- Consultas parametrizadas mediante Prisma.
- Protección contra XSS y CSRF.
- Helmet y políticas apropiadas para scripts y estilos.
- Cookies HttpOnly, Secure en HTTPS y SameSite adecuado.
- Protección básica contra fuerza bruta en login.
- Variables de entorno para secretos.
- Sesiones persistentes; no usar MemoryStore en producción.
- Protección de rutas y autorización por empresa.
- Validación y autorización de eventos Socket.IO.
- Configuración compatible con el proxy HTTPS de Codespaces.
- Escape seguro de datos mostrados en EJS.
- Paginación e índices de base de datos.
- Actualizaciones en tiempo real sin recargar páginas.

No escribas secretos reales en el repositorio.

## 7. Organización del código

Utiliza una arquitectura monolítica modular similar a:

    src/
      app.js
      server.js
      config/
      middleware/
      modules/
        auth/
        users/
        inventory/
        categories/
        dashboard/
        recipes/
        expiration/
        chat/
        notifications/
      views/
      public/
    prisma/
      migrations/
      seed.js
    tests/
    docs/
    .devcontainer/
    compose.yaml
    package.json
    package-lock.json
    .env.example
    README.md

Dentro de los módulos separa rutas, controladores, servicios, validaciones y repositorios cuando sea necesario.

No implementes todavía microservicios ni un frontend desacoplado.

La separación modular debe facilitar la migración posterior a tres servicios: autenticación, inventario y chat.

## 8. GitHub Codespaces: requisito indispensable

El proyecto debe poder desarrollarse y probarse desde el navegador, sin instalar tecnologías en la computadora del estudiante.

Crea:

1. `.devcontainer/devcontainer.json` usando una imagen oficial compatible con Node.js 24.
2. La feature Docker-in-Docker compatible.
3. Configuración del puerto 3000 para Codespaces.
4. `compose.yaml` con MySQL 8, volumen persistente y healthcheck.
5. `.env.example` con todas las variables necesarias, sin secretos reales.
6. Scripts npm para desarrollo, pruebas, migraciones, seed y arranque.
7. README con instrucciones específicas para Codespaces.

El servidor debe escuchar en `0.0.0.0` cuando corresponda.

En Codespaces, MySQL debe poder levantarse con Docker Compose y la aplicación con npm. El código debe admitir una URL de conexión local y no depender de localhost de la computadora del usuario.

Comprueba que el acceso por el puerto reenviado de Codespaces soporte inicio de sesión, cookies de sesión, formularios, Socket.IO y conexiones entre dos pestañas.

## 9. Pruebas y evidencias

Implementa al menos cinco pruebas automatizadas relevantes. Prefiero ocho o más, incluyendo:

1. Registro válido.
2. Rechazo de email duplicado.
3. Contraseña incorrecta.
4. Protección de rutas.
5. Recuperación de contraseña y caducidad del token.
6. Validación del CRUD.
7. Paginación y búsqueda.
8. Rechazo de conexiones WebSocket no autenticadas.
9. Aislamiento de usuarios entre empresas.
10. Persistencia de mensajes.

Configura una base de datos de pruebas separada para no destruir datos de desarrollo.

Agrega una prueba de integración que demuestre comunicación entre dos usuarios cuando sea viable.

Incluye una medición reproducible de rendimiento (Lighthouse o latencia de consulta).

## 10. Documentación académica

Genera:

- README completo.
- Diagrama Mermaid de arquitectura monolítica.
- Diagrama de entidades y relaciones.
- Historias de usuario priorizadas.
- Matriz de cumplimiento de la guía y rúbrica.
- Objetivo general y objetivos específicos.
- Propuesta de cronograma y reparto de trabajo para 4 o 5 integrantes.
- Instrucciones para la demostración.
- Evidencias de pruebas y rendimiento.
- Sección de declaración de uso de IA.
- Documento `docs/second-bimester-roadmap.md` que explique cómo migrar después a React, microservicios, JWT, API Gateway, bases de datos independientes, Docker, observabilidad y CI/CD.

La documentación debe diferenciar lo implementado de lo pendiente y no inventar resultados, pruebas, commits ni métricas.

Prepara el proyecto para etiquetarlo `v1.0-b1` una vez esté validado.

## 11. Diseño visual

Conserva la identidad de Food Waste Fighter y mejora su aspecto:

- Diseño profesional para una cafetería o restaurante.
- Tonos verdes y neutros, relacionados con sostenibilidad.
- Sidebar o navegación principal coherente.
- Dashboard con tarjetas e indicadores.
- Formularios accesibles y responsivos.
- Tablas con filtros, paginación y estados.
- Alertas con prioridad visual.
- Chat integrado en la interfaz.

No sacrifiques funcionalidad ni accesibilidad por efectos visuales.

## 12. Forma de trabajo

Trabaja por fases:

Fase A: auditoría del proyecto original y plan de migración.

Fase B: configuración de Codespaces, Express, EJS, Prisma y MySQL.

Fase C: modelo de datos, autenticación y seguridad.

Fase D: dashboard, inventario, categorías, recetas y caducidad.

Fase E: chat Socket.IO y notificaciones.

Fase F: pruebas, correcciones, rendimiento y documentación.

En cada fase:

1. Crea o modifica los archivos necesarios.
2. Ejecuta los comandos disponibles.
3. Comprueba el funcionamiento.
4. Corrige los errores encontrados.
5. Resume qué quedó implementado y qué falta.

No inventes que una prueba pasó si no la ejecutaste.

No reemplaces una funcionalidad obligatoria por una interfaz simulada o un botón sin comportamiento.

Prioriza el cumplimiento de la rúbrica por encima de funcionalidades opcionales.

Cuando encuentres incompatibilidades de versiones, consulta la documentación vigente y utiliza versiones estables compatibles.

Empieza analizando los archivos originales y la guía. Después implementa la primera fase y continúa progresivamente, manteniendo el proyecto ejecutable al final de cada fase.