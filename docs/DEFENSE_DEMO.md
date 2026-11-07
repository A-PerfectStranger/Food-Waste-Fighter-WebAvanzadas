# Defensa: 15 minutos de exposición y 5 de preguntas

## Preparación

Completar `[FECHA_HORA]`, `[INTEGRANTES]`, `[URL_CODESPACE_PRIVADO]` y el enlace
de entrega. Se usa una empresa ficticia con ADMIN y EMPLOYEE en **perfiles de
navegador distintos**. Dos pestañas con una cookie compartida representan una
misma persona, no prueban dos identidades.

Desde Codespaces se siguen README y sus comandos: setup, instalación, build,
MySQL, migraciones y seed. Se abre el puerto 3000 desde Ports con visibilidad
privada, APP_ORIGIN HTTPS y TRUST_PROXY=1. No se exponen 3306/3307. Se comprueban
`/ready`, login y los formularios antes de la exposición. El seed conserva
contraseñas aleatorias descartadas: se establece acceso con la recuperación
privada de README; no se proyecta la bandeja, tokens ni .env.

Preparar un ADMIN, su EMPLOYEE y una segunda empresa ficticia; categorías y
recetas de ejemplo mediante seed. Si el entorno falla, mostrar los resultados
registrados como evidencia previa, indicando el fallo en vivo. No sustituir
la demo por una interfaz fingida.

## Cronómetro y participación

| Tiempo | Responsable por completar | Contenido y pantalla |
| --- | --- | --- |
| 0:00–3:00 | `[INTEGRANTE_1]` | Problema PYME, objetivo, alcance; arquitectura monolítica y ER |
| 3:00–6:00 | `[INTEGRANTE_2]` | Registro/login, Argon2id, roles, sesión, recuperación y CSRF |
| 6:00–9:00 | `[INTEGRANTE_3]` | Inventario/validación/búsqueda/página 2, dashboard, recetas y caducidad |
| 9:00–12:00 | `[INTEGRANTE_4]` | Dos usuarios de chat, persistencia/presencia, tenant isolation y aviso en vivo |
| 12:00–15:00 | `[INTEGRANTE_5_OPCIONAL]` | Regresión, p50/p95, accesibilidad, limitaciones/conclusiones/IA |
| 15:00–20:00 | Todos | Preguntas; cada persona explica su aporte real |

Con cuatro integrantes: 0:00–3:00 persona 1, 3:00–6:30 persona 2,
6:30–10:30 persona 3, 10:30–14:00 persona 4, y 14:00–15:00 conclusiones
repartidas entre las cuatro. Ajustar el bloque final antes del ensayo para que
todas las personas hablen. Los responsables son placeholders, no autoría atribuida.

## Secuencia ejecutable de demostración

1. Mostrar el diagrama ARCHITECTURE.md y ER DATA_MODEL.md. Explicar que MySQL
   es dependencia; Express/EJS/Socket.IO pertenecen al mismo proceso.
2. Entrar como ADMIN con un formulario nuevo. Mostrar validación HTML5 de un
   correo o confirmación errónea. Explicar Zod como segunda barrera y las pruebas
   de credenciales erróneas, duplicados y CSRF (sin publicar valores del token).
3. Mostrar en el código `passwords.js` Argon2id: 19456 KiB, t=2, p=1. Si se
   observa una fila ficticia, mostrar solo el prefijo/parámetros del hash, nunca
   credenciales. Explicar que hashing no es cifrado reversible.
4. Crear un producto con 2.125 kg y caducidad de hoy a dos días. Intentar fechas
   invertidas y mostrar que no se guardan. Buscar por nombre/categoría, mostrar
   siguiente página con datos suficientes, editar a 1.125 y consultar detalle.
5. Mostrar dashboard y crítico/advertencia/caducado/stock bajo. Explicar fechas
   civiles en BUSINESS_TIMEZONE y que las recetas sugieren por nombre sin
   garantizar unidades, cantidad ni inocuidad. Abrir ingredientes y preparación.
6. Como ADMIN crear un EMPLOYEE en `/team` si aún no existe; abrir su perfil
   independiente. Ambos abren `/chat`, envían un mensaje y observan presencia.
   Recargar el receptor para comprobar historial MySQL. Otra empresa no lo ve.
7. Dejar el receptor en chat mientras ADMIN registra/edita otro alimento cercano
   a caducar: aparece el aviso sin navegación. Aclarar que las tablas/métricas
   mantienen su consulta inicial y el aviso enlaza al inventario actualizado.
8. Abrir DevTools Network y filtrar `socket.io`: identificar polling, upgrade 101
   y transporte wss bajo HTTPS. En Application observar **solo atributos** Secure,
   HttpOnly y SameSite; ocultar valores de cookies/IDs. Explicar Origin, token
   de sesión, reautorización, General y eventos de REALTIME.md.
9. Mostrar rechazo anónimo/ajeno con `tests/chat.integration.test.js`, no enviando
   payloads que expongan datos reales. Logout invalida la sesión; una conexión
   revocada no vuelve a recibir mensajes y se retira de presencia.
10. Mostrar comandos y resúmenes de QUALITY_REVIEW/PERFORMANCE, con condiciones
    de medición y límites. Cerrar con aprendizajes, pendientes reales y uso de IA.

## Evidencia detallada de Codespaces para la defensa

La fase 4 está aceptada y fusionada; esta recopilación no reabre su aceptación.
Aquí no se ha capturado tráfico de un Codespace real. Completar el acta al
realizar la prueba; no copiar resultados del proxy local como si fueran remotos.

| Comprobación | Evidencia real por adjuntar |
| --- | --- |
| Fecha/revisión Git/URL pública del puerto sin credenciales | `[FECHA_SHA_ORIGEN]` |
| Registro/login/logout y CSRF nativos por HTTPS | `[RESULTADO_Y_CAPTURA_SIN_SECRETOS]` |
| Cookie Secure/HttpOnly/SameSite (valores ocultos) | `[ATRIBUTOS_OBSERVADOS]` |
| Dos personas y empresas aisladas | `[USUARIOS_FICTICIOS_Y_RESULTADO]` |
| Upgrade 101 a wss o fallback documentado | `[TRANSPORTE_OBSERVADO]` |
| Historial al recargar y aviso sin recarga | `[RESULTADO_HISTORIAL_AVISO]` |
| Cierre de sesión y retiro de presencia | `[RESULTADO_REVOCACION]` |
| Incidencias reales / responsable / fecha | `[INCIDENCIAS_O_NINGUNA_OBSERVADA]` |

No guardar HAR completo sin depurarlo: puede contener cookies, tokens o enlaces
de reset. Las capturas públicas solo deben incluir datos ficticios necesarios.

## Preguntas de práctica

- ¿Por qué EJS y un monolito? Alcance del primer bimestre, menor complejidad;
  separación modular permite evaluar servicios después.
- ¿Qué autentica el socket? Sesión MySQL firmada en cookie y token del HTML;
  usuario/empresa/version se vuelven a consultar, no vienen del payload.
- ¿Socket.IO siempre usa WebSocket? No: Engine.IO inicia polling y negocia
  WebSocket; el evento de aplicación se conserva con el transporte alternativo.
- ¿Un índice acelera contains? No necesariamente; `%texto%` no es búsqueda de
  prefijo. Mostrar plan representativo y medición real, sin afirmar causalidad.
- ¿Qué ocurre si un ack se pierde? El mensaje puede haberse guardado. No se
  reenvía automáticamente ni se promete exactamente una vez.
- ¿Por qué el token de reset se hashea y el de sesión no se expone? Reducir
  exposición de enlaces usables; HttpOnly protege lectura por scripts de la cookie.
- ¿Qué no está probado? Escala/alta disponibilidad, auditoría externa, estudio
  económico, accesibilidad completa y trazas remotas aún no adjuntadas.

## Conclusiones y aprendizajes sustentados

La migración reemplaza contraseñas en claro y consultas por ID sin empresa por
hash y autorización comprobados. Los tests de fechas/separación/sesiones y el
navegador encontraron defectos reales; se conserva la evidencia de corrección.
La revisión de fase 5 mostró que una interfaz visualmente coherente puede tener
contraste o semántica insuficientes. Persistir un evento y entregarlo en vivo son
operaciones distintas. No se convierte esa evidencia técnica en una reducción
porcentual de desperdicio ni se atribuyen aportes personales inexistentes.
