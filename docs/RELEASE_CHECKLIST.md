# Preparación de entrega y versión v1.0-b1

Este documento prepara la revisión final; no declara una entrega académica ya
enviada ni autoriza por sí solo una publicación/tag. El PR de fase 5 conserva
los pendientes externos y los placeholders solicitados.

## Comprobaciones reproducibles

En Codespaces con .env privada y MySQL de desarrollo/pruebas independientes:

```sh
npm ci
npm run build
npm run db:validate
npm run db:migrate
npm run db:seed
docker compose --profile test up -d --wait mysql-test
npm test
npm run test:db
# Instalar navegador una vez si no existe (dentro de Codespaces):
npx playwright install --with-deps chromium
npm run verify:browser
# Medir por separado de las pruebas/navegador para reducir interferencia:
npm run measure:queries
npm audit --omit=dev --audit-level=high
git diff --check
```

`verify:browser` y `measure:queries` se niegan a utilizar desarrollo, requieren
TEST_DATABASE_URL y limpian únicamente sus fixtures. Necesitan migraciones de
test ya desplegadas por test:db. Informes/capturas nuevos quedan en work/ ignorado;
no sobrescriben silenciosamente la evidencia publicada. El navegador puede
seleccionarse con BROWSER_EXECUTABLE_PATH; en Linux se detecta /usr/bin/chromium.
No se modifica el origen de la aplicación real para ejecutar las pruebas.

## Lista de cierre para el equipo

- [ ] Cotejar rótulos/pesos con el DOCX oficial y comprobar suma de 20 puntos en COMPLIANCE_MATRIX.
- [ ] Sustituir placeholders de equipo/periodo/docente/fecha/URL con datos reales autorizados.
- [ ] Registrar contribuciones y commits reales de todas las personas, sin fabricar actividad.
- [ ] Revisar el PR de fase 5 y resolver comentarios; confirmar el SHA que se presentará.
- [ ] Adjuntar acta y capturas depuradas de Codespaces según DEFENSE_DEMO, preservando la aceptación previa de fase 4.
- [ ] Ensayar 15 minutos más 5 preguntas con participación de todos; observar teclado y lector de pantalla real.
- [ ] Confirmar que no se publican .env, outbox, cookies, tokens, certificados privados, datos personales ni el SQL destructivo original.
- [ ] Verificar el estado de dependencias al momento de entregar; un audit sin alertas no certifica seguridad total.
- [ ] Ejecutar la regresión y medición en la revisión final y conservar resultados con fecha/SHA/condiciones.
- [ ] Validar todos los criterios reales antes de solicitar crear v1.0-b1; no existe una etiqueta creada por este documento.
- [ ] Enviar el enlace público, presentación y evidencia a `[URL_ENTREGA_CURSO]`; guardar comprobante `[COMPROBANTE_REAL]`.

## Procedimiento de versión, solo después de la validación y autorización

Verificar árbol limpio, main actualizado y tag inexistente. Crear una etiqueta
anotada `v1.0-b1` sobre el SHA aprobado y publicar esa etiqueta únicamente cuando
se solicite la entrega. No usar force, no mover un tag publicado y no etiquetar
una revisión con tests fallidos. Una publicación de PR no equivale a release ni
a envío al curso.

## Datos de entrega por completar

| Campo | Valor |
| --- | --- |
| Repositorio | https://github.com/A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas |
| Revisión final aprobada | `[SHA_APROBADO]` |
| Etiqueta confirmada, si se crea | `[TAG_Y_URL_REALES]` |
| Presentación | `[URL_PRESENTACION]` |
| Evidencia Codespaces | `[URL_EVIDENCIA_DEPURADA]` |
| Integrantes/aportes | `[DATOS_REALES_EN_ACADEMIC_BRIEF]` |
| Entrega y confirmación | `[URL_Y_COMPROBANTE_CURSO]` |

Hasta completar esos datos el repositorio está preparado para revisión, no se
presenta como entrega final ni como cumplimiento de autoría individual.
