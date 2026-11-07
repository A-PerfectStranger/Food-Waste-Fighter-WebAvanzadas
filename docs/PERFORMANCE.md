# Rendimiento medido y evidencia de índices

## Resultado observado

Medición del 7 de noviembre de 2026 a las 15:11 de America/Bogota (20:11 UTC),
base `e6dfe81` más el árbol de fase 5. Registro original:
[evidence/query-performance.json](evidence/query-performance.json).

| Operación real de inventario | Coincidencias / devueltos | p50 ms | p95 ms | Máximo ms |
| --- | --- | --- | --- | --- |
| Primera página | 1000 / 10 | 4.801 | 5.923 | 6.020 |
| Página 50 (offset 490) | 1000 / 10 | 4.965 | 6.384 | 6.615 |
| Subcadena «Alimento 00» | 100 / 10 | 7.595 | 12.123 | 17.628 |

Cada muestra llama al **repositorio real** inventory.repository.list: transacción
con count, lista SQL paginada, orden caducidad/ID y relación de categoría. La
medición incluye Node/Prisma/adaptador/ida-vuelta a MySQL; no incluye render,
HTTP, red del usuario, proxy de Codespaces ni coste de un navegador.

## Condiciones y reproducción

Node v24.22.1, Prisma/adaptador 7.10.1, MySQL 8.4.13. El entorno informa CPU
AMD EPYC 9V74, 3 CPUs lógicas y 9.73 GiB de memoria; no se presume hardware
exclusivo ni equivalencia con Codespaces. Una empresa ficticia, 1000 alimentos,
una categoría, cantidades decimales y caducidades repartidas en 30 días.

Por caso: 5 calentamientos excluidos y 30 muestras en serie, concurrencia 1.
Los percentiles usan rango más próximo `ceil(q*n)-1`. Se verifican total y 10
filas en cada lectura. No se estaba ejecutando el escaneo de navegador durante
la medición publicada; el primer sondeo concurrente fue descartado para reducir
interferencia. La caché está caliente: no son tiempos de arranque en frío.

```sh
# Con .env configurada y mysql-test saludable:
npm run build
npm run test:db
# Ejecutar sin otras cargas de prueba en paralelo:
npm run measure:queries
```

El script requiere TEST_DATABASE_URL de MySQL con sufijo `_test` y nombre distinto
de desarrollo. Crea fixtures únicos, limpia sus alimentos/empresa en finally y
escribe el resultado nuevo en `work/query-performance.json`. No ejecuta reset,
no elimina registros ajenos y no imprime URLs/credenciales. La copia publicada
no se actualiza automáticamente: revisar condiciones y resultados antes de
versionar una nueva medición.

## Índices y plan observado

Los índices reales incluyen `(companyId,name)`, `(companyId,expiresDate)` y
`(categoryId,companyId)`. El JSON contiene SHOW INDEX y EXPLAIN de SQL
**representativo parametrizado**, separado de la transacción de aplicación que
se cronometra. No se afirma que sea la traza exacta de todas sus consultas.

- Listado ordenado: MySQL eligió `FoodItem_companyId_expiresDate_idx`, tipo ref,
  `Using index`, con 1000 filas estimadas. InnoDB incorpora la PK en el índice
  secundario; el orden con ID es estable.
- Subcadena `%Alimento 00%`: el plan representativo eligió **ALL**, sin key,
  `Using where; Using filesort`, con 1000 filas estimadas. La existencia de un
  índice por nombre no demuestra una búsqueda de subcadenas eficiente.

La aplicación busca también por nombre de categoría; ese OR/relación forma
parte del repositorio medido. El plan simplificado de subcadena no modela todo
ese OR. No se usa FORCE INDEX para fabricar una mejora.

## Interpretación y límites

Estos datos establecen una línea base local reproducible y comprueban que la
página no devuelve todo el inventario. No prueban capacidad de producción,
concurrencia, throughput, escalabilidad, cumplimiento de un SLA ni causalidad
de los índices sobre una mejora no medida. No se comparó una versión sin índice,
por lo que no se publica un porcentaje de aceleración.

Con más datos revisar count, costo del OR de categoría, estrategia de búsqueda
de subcadenas y paginación profunda por cursor. Cambiar a prefijos o FULLTEXT
modifica semántica y debe justificarse por requisitos; no se cambia el negocio
solo para reducir un número. Los tests de live updates se documentan aparte:
una latencia SQL no mide entrega WebSocket.
