# Funcionalidad empresarial — fase 3

## Base y alcance

La implementación parte de `origin/main` en `bedcdc1`, que ya incluye las fases
1 y 2. Reutiliza sus modelos, migraciones, sesiones persistentes, autenticación,
CSRF y autorización. No se requiere una nueva migración ni un cambio de secretos.

El ZIP `Food_Waste_Fighter-main.zip` aportado de nuevo se extrajo de forma segura
en `work/original/` (107 entradas, ignoradas por Git). Se revisaron sus JSP,
controladores de inventario/dashboard/recetas/caducidad y CSS como referencia de
migración. No se ejecutó la aplicación Java ni el SQL original.

## Apariencia conservada

| Fuente del ZIP | Adaptación EJS |
| --- | --- |
| `components/navbar.jsp` | `partials/navigation.ejs`: libro SVG original, navegación, menú móvil, enlace activo y cierre POST |
| `dashboard.jsp` | `dashboard.ejs`: saludo, alertas, tarjetas y sugerencias; se añaden los cuatro contadores obligatorios |
| `listarAlimentos.jsp`, `productosACaducar.jsp` | `inventory/list.ejs`: tabla, leyenda, estados, acciones; se añaden filtros y paginación |
| `registrarAlimento.jsp`, `editarAlimento.jsp` | `inventory/form.ejs`: contenedor, formulario y botones; cantidad/unidad separadas, ingreso y stock mínimo |
| `eliminarAlimento.jsp` | `inventory/delete.ejs`: confirmación explícita antes del POST |
| `recetas.jsp`, `detalleReceta.jsp` | `recipes/`: cuadrícula, recipe-card, ingredient-item, preparation-step y tips-card |
| `css/styles.css` | `src/styles/legacy.css`: contenido idéntico al normalizar CRLF/LF |

Inter, el verde/gris y los colores Tailwind 3 de las alertas se sirven localmente.
Las categorías y el detalle de alimento reutilizan los mismos contenedores,
inputs y botones; no se introduce otra identidad visual. Los enlaces más oscuros,
el foco de teclado, los textos de estado y la preferencia de movimiento reducido
aportan accesibilidad. La navegación móvil se activa antes para acomodar las
nuevas secciones sin desbordamiento.

El modelo actual no almacena imágenes, nutrición, porciones, dificultad ni tiempos
de receta. No se inventan valores ni imágenes para esos bloques opcionales del
original. Las recetas muestran los campos e ingredientes realmente persistidos;
sus pasos respetan las líneas del texto de preparación.

## Rutas y permisos

Todas las rutas siguientes requieren sesión. La empresa se obtiene del usuario
consultado nuevamente en MySQL, nunca del formulario, URL de filtro o sesión
con un rol almacenado obsoleto.

| Ruta | Operación | ADMIN | EMPLOYEE |
| --- | --- | --- | --- |
| `/dashboard`, `/account` | Métricas y cuenta | Sí | Sí |
| `/inventory`, `/inventory/:id` | Listado, búsqueda y detalle | Sí | Sí |
| `/inventory/new`, POST `/inventory` | Alta | Sí | Sí |
| `/inventory/:id/edit`, POST del mismo path | Edición | Sí | Sí |
| `/inventory/:id/delete`, POST del mismo path | Confirmar/eliminar | Sí | No |
| `/categories` | Consultar categorías | Sí | Sí |
| POST `/categories`, POST `/categories/:id/edit` | Crear/renombrar | Sí | No |
| `/categories/:id/delete`, POST del mismo path | Confirmar/eliminar si no tiene productos | Sí | No |
| `/expiration` | Clasificación y filtros | Sí | Sí |
| `/recipes`, `/recipes/:id` | Recetas, ingredientes y preparación | Sí | Sí |

Los empleados registran y corrigen existencias para su trabajo diario;
administración controla las eliminaciones y la clasificación. Todas las
mutaciones son POST con token CSRF. IDs ajenos/inexistentes devuelven el mismo
404; las categorías ajenas se rechazan también al crear/editar/filtrar.
Las FK compuestas existentes refuerzan el aislamiento y evitan borrar categorías
en uso, incluso si otra petición modifica los datos concurrentemente.

## Reglas de negocio y consultas

- Siete campos del alimento: nombre, categoría, cantidad decimal, unidad, ingreso,
  caducidad y mínimo de stock (cantidad y unidad son independientes).
- `DECIMAL(12,3)`: 0–999999999.999, máximo tres decimales, sin conversión binaria
  a Number. Unidades admitidas: kg, g, l, ml, unidad. Nombre: 2–120 caracteres.
- Fechas civiles válidas para MySQL (1000–9999), caducidad >= ingreso. El cliente
  usa HTML5 y comprueba el orden; Zod valida de nuevo antes de persistir.
- `BUSINESS_TIMEZONE` define **hoy**; los SQL DATE se comparan como días civiles,
  sin convertirlos a la hora del servidor. Caducado: antes de hoy; crítico: hoy
  hasta +2; advertencia: +3 a +5; normal: +6 en adelante. Próximos: 0–5 inclusive.
- Stock bajo: cantidad <= mínimo, incluido cero. Dashboard cuenta registros de
  alimentos, no suma cantidades con unidades diferentes. Muestra los tres más
  próximos, separando explícitamente los caducados.
- Inventario: `count` + `findMany(skip, take:10)` dentro de una transacción;
  orden estable por caducidad e ID. Busca coincidencias por nombre de producto o
  categoría; permite combinar categoría y estado. Los enlaces conservan filtros.
  Una página fuera de rango muestra vacío y navegación; filtros inválidos: 400.
- Índices existentes: empresa/nombre, empresa/caducidad y categoría/empresa. Las
  búsquedas parciales `contains` pueden recorrer los registros del tenant;
  no se afirma que un índice B-tree resuelva cualquier subcadena. La medición
  de rendimiento sigue siendo trabajo de fase 5.
- Categorías: unicidad por empresa, renombrado y borrado restringido por FK.
- Recetas: lectura con paginación SQL de 10, detalle/ingredientes por empresa.
  Se conserva la coincidencia parcial de nombres sin distinguir mayúsculas en
  ambas direcciones. Se excluyen alimentos caducados y cantidades cero.
  Las marcas indican coincidencia, no suficiencia de cantidad/unidad ni seguridad
  alimentaria. No hay conversiones ni descuento automático de existencias.
- Sugerencias: los tres alimentos utilizables más próximos en los siguientes
  cinco días permiten buscar/rankear hasta dos recetas en SQL parametrizado;
  no se realiza una consulta por receta ni se carga todo el catálogo. Se omite
  el fallback original de recetas sin coincidencias para no sugerir coincidencias
  inexistentes. No se recomiendan alimentos caducados.
- Confirmación de borrado obligatoria, errores claros, campos de formulario
  conservados y mensajes de éxito en sesión tras redirección. Se espera el guardado
  explícito de la sesión antes de emitir la redirección y antes de mostrar el
  aviso consumido, evitando que un navegador siga los encabezados antes de la
  persistencia. Una regresión con almacén lento verifica este orden. EJS escapa
  los datos.

## Verificación

```sh
npm run build
npm run db:validate
npm test
docker compose --profile test up -d --wait mysql-test
npm run test:db
```

Las suites de negocio comprueban límites de fecha/zona/DST/año bisiesto,
precisión/rangos, CRUD y persistencia real, validación/CSRF, aislamiento por IDs
y categorías, permisos, búsqueda/paginación estable, dashboard, categorías en uso,
recetas y XSS. El runner conserva la protección de base independiente `_test`
y limpia únicamente registros creados por las pruebas.

La sesión de implementación también utiliza Chromium real con el servidor de
producción y MySQL local a 1280×900, 390×844 y 320×740; el harness y capturas quedan
en `work/` ignorado. Esto verifica formularios nativos, HTML5/JS, CSS/paleta,
navegación y ausencia de desbordamiento/errores. No sustituye una aceptación
de las nuevas pantallas en el HTTPS reenviado de Codespaces.

## Siguiente fase

La fase 4 implementará chat, enlaces de navegación al chat y notificaciones
de inventario en tiempo real con Socket.IO sobre el mismo servidor. No se añade
un enlace o botón de chat sin funcionalidad. En esta fase, las alertas son
información consultada al cargar la página; no se afirma actualización en vivo.

Trabajo asistido por OpenAI Codex: adaptación de las plantillas del ZIP,
implementación, revisión y verificación. Los resultados exactos y sus límites
se registran en PROGRESS.md.
