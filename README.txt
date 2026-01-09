=== CIDEAPPS WhatsApp Widget ===
Contributors: CIDEAPPS
Donate link: https://cideapps.com/
Tags: whatsapp, chat, widget, floating, contact, messenger, customer support, live chat, social media, communication, lead generation, customer service, whatsapp button, whatsapp chat, contact form, floating button, click to chat, instant messaging, customer engagement, mobile friendly, responsive
Requires at least: 6.7
Tested up to: 6.9
Requires PHP: 8.3
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Widget flotante de WhatsApp completamente personalizable y rebrandable para WordPress. Permite a tus visitantes contactarte directamente vía WhatsApp con mensajes pre-configurados y personalizables.

== Description ==

**CIDEAPPS WhatsApp Widget** es un plugin moderno y ligero que agrega un widget flotante de WhatsApp a tu sitio WordPress. Permite a los visitantes contactarte directamente a través de WhatsApp con un solo clic, mejorando la conversión y la experiencia del usuario.

= Características Principales =

* **Widget Flotante Personalizable**
  * Botón flotante posicionable (izquierda/derecha)
  * Tooltip personalizable con texto propio
  * Animación configurable con delay personalizable
  * Badge opcional para mostrar notificaciones (0-999)

* **Ventana Tipo Chat**
  * Diseño similar a WhatsApp
  * Avatar del agente configurable (Media Uploader)
  * Nombre y estado del agente personalizables
  * Fondo del chat personalizable (imagen por defecto o personalizada)
  * Campo de texto para que el usuario escriba su mensaje
  * Call to Action (CTA) personalizable

* **Soporte Internacional**
  * Selector de país con banderas y códigos telefónicos
  * Soporte para 240+ países
  * Validación automática de números telefónicos
  * Formato internacional de números

* **Mensajes Personalizables**
  * Plantilla de mensaje con placeholders dinámicos
  * Placeholders: `{SITE}`, `{URL}`, `{TITLE}`
  * Texto del botón personalizable
  * Placeholder del campo de texto personalizable

* **Personalización Visual**
  * Color del tema personalizable (color picker)
  * Imagen del botón personalizable (Media Uploader)
  * Posición del botón configurable
  * 100% White-label (sin marcas de terceros)

* **Rendimiento y Seguridad**
  * Vanilla JavaScript (sin jQuery en frontend)
  * Carga condicional (solo si hay teléfono configurado)
  * Sanitización completa de inputs
  * Protección contra XSS
  * Código optimizado siguiendo estándares de WordPress

= Compatibilidad =

* WordPress 6.7, 6.8, 6.9
* PHP 8.3 o superior
* Multisite compatible
* Todos los temas compatibles
* Sin conflictos conocidos

= ¿Por qué elegir este plugin? =

* ✅ **100% Personalizable**: Sin marcas de terceros, totalmente rebrandable
* ✅ **Rápido y Ligero**: Vanilla JavaScript, carga condicional
* ✅ **Seguro**: Código auditado siguiendo estándares de WordPress
* ✅ **Fácil de Usar**: Configuración sencilla desde WordPress Admin
* ✅ **Soporte Internacional**: Selector de país para todos los países
* ✅ **Optimizado para SEO**: No afecta PageSpeed Insights
* ✅ **Responsive**: Compatible con dispositivos móviles

== Installation ==

= Instalación Automática =

1. Ve a **Plugins > Añadir nuevo** en WordPress Admin
2. Busca "CIDEAPPS WhatsApp Widget"
3. Haz clic en **Instalar ahora**
4. Activa el plugin

= Instalación Manual =

1. Descarga el plugin desde WordPress.org
2. Sube la carpeta `cideapps-wa-widget` a `/wp-content/plugins/`
3. Activa el plugin desde el menú **Plugins** en WordPress

= Activación =

1. Después de activar, ve a **Ajustes > WhatsApp Widget**
2. Configura tu número de teléfono con código de país
3. Personaliza el widget según tus necesidades
4. ¡Listo! El widget aparecerá automáticamente en tu sitio

== Frequently Asked Questions ==

= ¿Cómo configuro mi número de teléfono? =

Usa el selector de país en la página de configuración. Selecciona tu país y luego ingresa solo el número local (sin código de país). El código se agregará automáticamente.

= ¿Puedo personalizar el mensaje que se envía? =

Sí, puedes configurar una plantilla de mensaje en la sección "Button > Message". Soporta placeholders: `{SITE}`, `{URL}`, `{TITLE}`.

= ¿El widget aparece en todas las páginas? =

Sí, el widget aparece en todas las páginas del sitio si hay un número de teléfono configurado. Si no hay número, el widget no se muestra.

= ¿Puedo usar mi propia imagen para el botón? =

Sí, puedes subir tu propia imagen usando el Media Uploader de WordPress en la sección "Button > Image".

= ¿El plugin afecta la velocidad del sitio? =

No. El plugin usa Vanilla JavaScript y carga condicional. Los recursos solo se cargan si hay un número configurado, y no afecta PageSpeed Insights.

= ¿Es compatible con Multisite? =

Sí, el plugin es totalmente compatible con WordPress Multisite.

= ¿Puedo personalizar los colores? =

Sí, puedes personalizar el color del tema usando el color picker en "Chat Window > Theme Color".

= ¿Qué pasa si desinstalo el plugin? =

Al desinstalar el plugin, todas las configuraciones se eliminan automáticamente de la base de datos. Las imágenes subidas no se eliminan (pueden estar en uso por otros contenidos).

= ¿Necesito conocimientos técnicos para usarlo? =

No, el plugin está diseñado para ser usado sin conocimientos técnicos. Todo se configura desde WordPress Admin con una interfaz sencilla.

= ¿El plugin es seguro? =

Sí, el plugin sigue todas las mejores prácticas de seguridad de WordPress:
* Sanitización completa de inputs
* Escapado de outputs
* Protección contra XSS
* Validación de datos
* Nonces CSRF
* Verificación de permisos

== Screenshots ==

1. Página de configuración del plugin con todas las opciones disponibles
2. Widget flotante en el sitio web (botón derecho)
3. Ventana del chat abierta mostrando el CTA y campo de mensaje
4. Selector de país con banderas y códigos telefónicos
5. Configuración del avatar del agente y fondo del chat

== Changelog ==

= 1.0.0 =
* Lanzamiento inicial
* Widget flotante de WhatsApp completamente personalizable
* Selector de país con soporte para 240+ países
* Ventana tipo chat con avatar, nombre y estado del agente
* Fondo del chat personalizable
* Mensajes con placeholders dinámicos ({SITE}, {URL}, {TITLE})
* Badge opcional para notificaciones
* Tooltip personalizable
* Color del tema personalizable
* Imagen del botón personalizable
* Botón de prueba en admin
* Validación completa de datos
* Protección contra XSS
* Sanitización de todos los inputs
* Carga condicional de recursos
* Compatibilidad con WordPress 6.7-6.9
* Compatibilidad con PHP 8.3+
* Compatible con Multisite
* 100% White-label sin marcas de terceros

== Upgrade Notice ==

= 1.0.0 =
Lanzamiento inicial del plugin. Configura tu número de teléfono y personaliza el widget según tus necesidades.

== Arbitrary section ==

= Palabras Clave para Búsqueda =

Este plugin puede ser encontrado buscando: whatsapp, chat widget, floating button, whatsapp button, click to chat, instant messaging, customer support, live chat, contact widget, whatsapp chat, messenger, social media, communication, lead generation, customer service, contact form, mobile friendly, responsive, white label, rebrandable

= Soporte =

Si tienes problemas o preguntas:
* Visita: https://cideapps.com
* Email: marco.aspeitia@cideapps.com

= Contribuciones =

Las contribuciones son bienvenidas. Por favor, reporta bugs o sugiere mejoras a través de GitHub.

== Developers ==

= Hooks y Filtros =

El plugin está diseñado para ser extensible. Los hooks y filtros están documentados en el código.

= Estructura del Código =

El plugin sigue la estructura del WordPress Plugin Boilerplate:
* Separación de código admin/public
* Uso de clases y namespaces
* WordPress Settings API
* WordPress Coding Standards

= Testing =

Probado con:
* WordPress 6.7, 6.8, 6.9
* PHP 8.3.6
* Múltiples temas populares
* Modo Multisite
