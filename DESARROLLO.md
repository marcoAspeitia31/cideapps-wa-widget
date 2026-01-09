# CURSOR_AGENT_INSTRUCCIONES.md

## Objetivo
Crear un plugin WordPress (base generado con https://wppb.me/) que replique el comportamiento tipo Joinchat **pero con tu marca / la del cliente**:

- Botón flotante WhatsApp
- Tooltip (ej. “¿Necesitas ayuda?”)
- Ventana tipo chat (CTA + botón “Iniciar conversación”)
- Badge opcional (ej. “1”)
- Página de ajustes en WP (Button + Chat Window) como en las capturas

Este documento es para que lo uses como **instrucciones y prompt base** con un Agente de IA en Cursor.

---

## 1) Genera el plugin base en wppb.me
En https://wppb.me/ crea el boilerplate con estos valores sugeridos (puedes ajustar):

- **Plugin Name:** CIDEAPPS WhatsApp Widget
- **plugin-slug:** cideapps-wa-widget
- **Plugin URL:** https://cideapps.com (opcional)
- **Author Name:** CIDEAPPS
- **Author Email:** (tu correo)
- **Author URL:** https://cideapps.com
- **Plugin Short Description:** Widget flotante de WhatsApp con tooltip y ventana tipo chat, rebrandable.

Descarga el ZIP y descomprímelo en tu workspace del proyecto.

Estructura esperada (puede variar según wppb.me):
.
├── admin
│   ├── class-cideapps-wa-widget-admin.php
│   ├── css
│   │   └── cideapps-wa-widget-admin.css
│   ├── index.php
│   ├── js
│   │   └── cideapps-wa-widget-admin.js
│   └── partials
│       └── cideapps-wa-widget-admin-display.php
├── cideapps-wa-widget.php
├── includes
│   ├── class-cideapps-wa-widget-activator.php
│   ├── class-cideapps-wa-widget-deactivator.php
│   ├── class-cideapps-wa-widget-i18n.php
│   ├── class-cideapps-wa-widget-loader.php
│   ├── class-cideapps-wa-widget.php
│   └── index.php
├── index.php
├── languages
│   └── cideapps-wa-widget.pot
├── LICENSE.txt
├── public
│   ├── class-cideapps-wa-widget-public.php
│   ├── css
│   │   └── cideapps-wa-widget-public.css
│   ├── index.php
│   ├── js
│   │   └── cideapps-wa-widget-public.js
│   └── partials
│       └── cideapps-wa-widget-public-display.php
├── README.txt
└── uninstall.php

---

## 2) Abre el plugin en Cursor (workspace)
1. Abre Cursor
2. `File > Open Folder...`
3. Selecciona la carpeta del plugin (la raíz donde está el `.php` principal)
4. Asegúrate de tener un WP local listo para probar:
   - `wp-content/plugins/cideapps-wa-widget/`
   - Activa el plugin en WP Admin

---

## 3) Reglas y estándares que debe seguir el Agente (IMPORTANTE)
Pega estas reglas al inicio del chat con el agente:

- **No usar branding de Joinchat** (nombres, logos, “Powered by Join.chat”, etc.)
- Mantener el plugin **white-label / rebrandable**
- Usar **WordPress Settings API** (register_setting, add_settings_section, add_settings_field)
- Sanitizar todo con:
  - `sanitize_text_field`, `sanitize_hex_color`, `absint`, `wp_kses_post`
- El frontend debe inyectarse con `wp_footer` (o hook equivalente)
- Assets frontend: `wp_enqueue_style` + `wp_enqueue_script`
- `wp_localize_script` para pasar settings a JS
- Evitar jQuery en frontend (vanilla JS). En admin sí puede usarse jQuery si es práctico.
- Si no hay teléfono configurado: **no renderizar** el widget y no cargar assets
- El link de WhatsApp debe usar `https://wa.me/<digits>?text=<encoded>`
- Implementar placeholders en el mensaje:
  - `{SITE}`, `{URL}`, `{TITLE}`

---

## 4) Prompt para el Agente de Cursor (cópialo tal cual)
> Úsalo como “System/Goal” o como primer mensaje del agente.

### PROMPT
Eres un agente experto en WordPress plugins (Settings API + JS/CSS).  
Vamos a construir un plugin basado en el boilerplate generado por wppb.me (ya está en el repo). El objetivo es implementar un widget flotante tipo Joinchat, pero 100% white-label.

#### Requerimientos funcionales
1) **Settings page** en WP Admin con 2 secciones (igual a las capturas):
   - **Button**
     - Telephone (solo dígitos para wa.me; si está vacío no se muestra el botón)
     - Message (textarea; soporta placeholders {SITE} {URL} {TITLE})
     - Image (Media uploader; guardar attachment_id)
     - Tooltip (texto corto)
     - Position on Screen (left/right)
     - Button Delay (segundos; -1 significa mostrar inmediatamente sin animación)
   - **Chat Window**
     - Call to Action (textarea; texto del globo en la ventana)
     - Button Text (texto del botón “Iniciar conversación”)
     - Theme Color (color picker)

2) **Frontend widget**
   - Botón flotante con ícono WhatsApp o imagen configurada.
   - Tooltip al lado del botón.
   - Al click abre/cierra una ventana tipo chat con header del color configurado.
   - CTA button abre WhatsApp con el número + mensaje prellenado.
   - Badge opcional (por ahora hardcode “1” en settings extras si es fácil; si no, dejar preparado para agregar después).
   - Persistencia opcional: recordar “cerrado” tooltip/ventana por X días (localStorage), configurable.

3) **Arquitectura**
   - Guardar settings en un único option array (ej. `cwaw_settings`).
   - Clase Admin para settings + encolar admin assets (media uploader + color picker).
   - Clase Public para render frontend + encolar assets y `wp_localize_script`.

4) **Entrega**
   - Implementa todo con cambios reales en archivos del boilerplate.
   - No inventes dependencias pesadas; vanilla JS.
   - Añade comentarios y nombres claros.
   - Asegura compatibilidad con WordPress moderno.

#### Pasos de trabajo
A) Primero analiza el boilerplate existente y dime:
   - dónde está el archivo principal del plugin
   - dónde se agregan menus/admin pages
   - dónde se encolan assets admin/public
   - qué clases existen y cómo se instancian

B) Luego implementa la settings page con Settings API y crea/actualiza:
   - clase admin
   - view del admin
   - admin.js para media uploader
   - admin.css (mínimo)

C) Luego implementa el widget frontend:
   - render HTML en footer
   - public.js para comportamiento (tooltip + open/close + WhatsApp link + placeholders)
   - public.css para estilos

D) Finalmente:
   - valida que si phone está vacío no se renderiza nada
   - revisa sanitización
   - documenta en README cómo configurar

---

## 5) Checklist de aceptación (para que valides rápido)
Cuando el agente termine, valida:

- [ ] Aparece menú/página de settings del plugin
- [ ] Guardan bien los campos (se persisten)
- [ ] Media uploader funciona (seleccionar/remover imagen)
- [ ] Color picker funciona y guarda hex válido
- [ ] En frontend aparece botón flotante
- [ ] Tooltip muestra el texto configurado
- [ ] Ventana abre/cierra y muestra CTA
- [ ] Botón “Iniciar conversación” abre WhatsApp con mensaje correcto
- [ ] Placeholders se reemplazan bien:
  - {SITE} => nombre del sitio
  - {URL} => URL actual
  - {TITLE} => document.title
- [ ] Si no hay teléfono, no se carga nada en frontend

---

## 6) Recomendaciones para iteración con el agente (trabajo por tareas)
Usa este flujo con Cursor:

1) **Task 1:** “Mapea el boilerplate y dime dónde tocar”  
2) **Task 2:** “Implementa settings page + sanitización + assets admin”  
3) **Task 3:** “Implementa render widget + assets public + lógica WhatsApp”  
4) **Task 4:** “Estilos Joinchat-like (pero neutros) y responsive”  
5) **Task 5:** “Extras: badge, persistencia, reglas de visibilidad por páginas”  

---

## 7) Notas opcionales (mejoras futuras)
- **intl-tel-input** en admin para bandera + prefijo + formato (si quieres UI idéntica).
- Reglas de visibilidad:
  - mostrar en todo el sitio / solo home / excluir IDs / excluir rutas.
- Multi-agente (varios números):
  - selector de “departamento” o “agente” en el widget.
- Horarios:
  - “online/offline” y mostrar otro CTA cuando esté cerrado.

---

## 8) Qué información NO debe hardcodear el agente
- No hardcodear números ni marca Joinchat.
- No incluir “Powered by …”
- No depender de servicios externos innecesarios.

---

## 9) Cómo probar local
1. Configura settings
2. Visita el front y prueba en móvil (responsive)
3. Verifica consola JS sin errores