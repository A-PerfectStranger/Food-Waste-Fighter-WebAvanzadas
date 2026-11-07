# Autenticación y seguridad — fase 2

Se implementa autenticación en el mismo monolito Express/EJS. No se utilizan JWT, una SPA ni un proveedor de identidad externo.

| Ruta | Comportamiento |
| --- | --- |
| `GET/POST /auth/register` | Nombre, correo, empresa y contraseña de 12–128 caracteres con confirmación. Alta atómica de empresa, ADMIN, inventario y sala General. |
| `GET/POST /auth/login` | Verificación Argon2id contra MySQL; mensaje genérico y rotación del ID de sesión. |
| `POST /auth/logout` | Validación CSRF, destrucción de sesión y borrado de cookie. No se permite GET. |
| `GET/POST /auth/forgot` | Respuesta pública genérica; generación de enlace privado de 30 minutos, sin revelar la existencia de la cuenta en el texto de respuesta. |
| `GET/POST /auth/reset` | Token aleatorio de 256 bits, hash SHA-256 en base de datos, consumo condicional en transacción y cambio Argon2id; revocación de sesiones previas. |
| `GET /dashboard` | Cuenta protegida: empresa, nombre, correo y rol. Las métricas de inventario se implementarán en fase 3. |
| `GET/POST /team` | Solo ADMIN. Listado limitado a la empresa actual y creación controlada de EMPLOYEE en esa misma empresa. |

## Sesión y autorización

Se utiliza express-session con `PrismaSessionStore` en MySQL, sin sustitución por MemoryStore. La cookie `fwf.sid` es HttpOnly, SameSite=Lax, con duración de ocho horas y atributo Secure cuando APP_ORIGIN usa HTTPS. Se requiere HTTPS al configurar NODE_ENV=production. En Codespaces se configura TRUST_PROXY=1 y el origen HTTPS exacto del puerto 3000.

El ID de sesión se regenera después del registro y del login. En cada petición se consulta el usuario y se compara `sessionVersion`; un cambio de contraseña incrementa esa versión y elimina las sesiones almacenadas. Una sesión que reaparezca por una escritura concurrente con versión antigua también se rechaza. El rol y la empresa no se aceptan desde campos públicos ni se confían a datos de la sesión sin consultar al usuario.

La sesión caducada se elimina al consultarse. Los campos sensibles no se incluyen en las vistas. Las respuestas de formularios y de cuenta usan Cache-Control:no-store.

## Protección de formularios

Cada sesión dispone de un token CSRF aleatorio. Todas las mutaciones exigen ese token, con comparación de longitud de bytes y comparación constante; se rechazan valores multibyte de longitud incompatible. Los orígenes ajenos se rechazan. Chromium puede enviar `Origin: null` en formularios nativos bajo Referrer-Policy:no-referrer; si se recibe Fetch Metadata, se exige `same-origin` para ese caso. Si el navegador o el proxy omiten ese encabezado opcional, se acepta únicamente con el token CSRF válido vinculado a la sesión. Una petición sin cookie de sesión o con token incorrecto se rechaza. Los orígenes explícitos ajenos y la metadata `cross-site` se rechazan incluso si se presenta un token válido.

Zod valida tipos, longitudes, correo, confirmación y campos desconocidos en el servidor. HTML5 valida campos requeridos, formato, límites y longitud; el JavaScript local valida la confirmación. EJS escapa los valores persistidos y los mensajes.

Registro, login, recuperación, reseteo y alta de empleado tienen un límite básico de diez peticiones por IP cada quince minutos. El contador es local al único proceso y se reinicia con el servidor; las sesiones y los tokens sí son persistentes en MySQL. La cuenta ADMIN mantiene el control de las altas de empleados.

## Recuperación y demostración local

El envío se simula mediante archivos JSON en `work/outbox/`, con directorio privado y archivos modo0600. Esa carpeta está ignorada por Git y no se sirve por HTTP. El enlace contiene el token en bruto únicamente en esa bandeja; no aparece en la respuesta pública ni en logs de la aplicación. El almacenamiento relacional contiene solo su hash. Los enlaces nuevos invalidan los anteriores; el consumo se realiza con actualización condicional dentro de una transacción para impedir el doble uso concurrente.

En Codespaces puede solicitarse recuperación para `admin@semilla.example` o `equipo@semilla.example` después del seed. Se consulta el archivo generado en el editor privado y se abre el enlace, sin publicarlo ni compartir la bandeja. Es una simulación académica, no un servicio SMTP.

## Conservación visual

Se adaptan los archivos suministrados `landing.html`, `login.jsp`, `registro.jsp` y `css/styles.css` a EJS y CSS local. Se conservan la distribución de tarjetas, el logo SVG, los tonos verdes/grises originales y la fuente Inter. Se mantienen los valores de la paleta Tailwind 3 original al compilar con Tailwind 4. Los scripts inline/CDN se trasladan a archivos locales para cumplir CSP. Se corrige el documento duplicado de la portada y se retiran estadísticas ficticias sin evidencia; las nuevas pantallas reutilizan los mismos componentes.

Inter se sirve desde `@fontsource/inter`, con licencia SIL Open Font License incluida en el paquete. Los originales proceden del ZIP aportado por el proyecto; no se atribuye su autoría a la herramienta de IA.

## Diagnóstico de un formulario rechazado

El403 mantiene la protección y muestra una referencia sin datos sensibles:

| Referencia | Situación observada por el servidor |
| --- | --- |
| `FWF_SESSION_COOKIE_MISSING` | No llegó la cookie de la aplicación; pueden intervenir políticas del navegador o el reconocimiento de HTTPS del proxy. |
| `FWF_SESSION_UNAVAILABLE` | Llegó una cookie, pero no se recuperó una sesión con token previo (por ejemplo, cookie inválida, sesión eliminada o caducada). |
| `FWF_FORM_ORIGIN_REJECTED` | El origen o Fetch Metadata no superó la comprobación. |
| `FWF_FORM_TOKEN_MISSING` | El formulario no incluyó un token de texto. |
| `FWF_FORM_TOKEN_CHANGED` | El token no corresponde a la sesión actual; puede ocurrir después de regenerar la sesión en otra pestaña. |

En ejecución de desarrollo/producción se registra `form_rejected` con la referencia y banderas de HTTPS/proxy/origen, además del tipo de Fetch Metadata. No se registran contraseñas, correos, cuerpo, parámetros de URL, valores de cookie, identificadores de sesión ni tokens. Se puede compartir esa referencia o la línea JSON de ese evento para diagnosticar el fallo. No se deben compartir cabeceras completas ni archivos .env.

La recepción de ese403 ocurre antes de procesar el registro o validar las credenciales: esa petición rechazada no crea una cuenta ni inicia sesión.
