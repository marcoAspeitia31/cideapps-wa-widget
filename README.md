# WhatsApp Floating Chat for WordPress by CIDEAPPS

> Widget flotante de WhatsApp completamente personalizable y rebrandable para WordPress.

[![WordPress](https://img.shields.io/badge/WordPress-6.7%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](http://www.gnu.org/licenses/gpl-2.0.html)

Un plugin WordPress moderno que agrega un widget flotante de WhatsApp a tu sitio, permitiendo a los visitantes contactarte directamente a través de WhatsApp. Totalmente personalizable, sin marcas de terceros, y optimizado para rendimiento y seguridad.

## ✨ Características

### 🎨 Personalización Completa
- **Widget flotante** posicionable (izquierda/derecha)
- **Tooltip personalizable** con texto personalizado
- **Ventana tipo chat** con diseño similar a WhatsApp
- **Avatar del agente** configurable con soporte para Media Uploader
- **Nombre y estado del agente** personalizables (ej: "Online", "Disponible")
- **Fondo del chat** personalizable (imagen por defecto o personalizada)
- **Color del tema** personalizable con color picker
- **Badge opcional** para mostrar notificaciones o contador
- **Delay del botón** configurable con animación

### 🌍 Soporte Internacional
- **Selector de país** con banderas y códigos telefónicos
- **Soporte para todos los países** (240+ países)
- **Formato internacional** de números telefónicos
- **Validación automática** de números telefónicos

### 💬 Mensajes Personalizables
- **Mensaje pre-configurado** con plantilla personalizable
- **Placeholders dinámicos**: `{SITE}`, `{URL}`, `{TITLE}`
- **Campo de texto** para que el usuario escriba su mensaje
- **Call to Action (CTA)** personalizable en la ventana del chat

### ⚡ Rendimiento y Seguridad
- **Vanilla JavaScript** (sin jQuery en frontend)
- **Carga condicional** (solo si hay teléfono configurado)
- **Sanitización completa** de todos los inputs
- **Protección contra XSS** y vulnerabilidades de seguridad
- **Código optimizado** siguiendo estándares de WordPress

### 🎯 Funcionalidades Adicionales
- **Botón de prueba** en admin para verificar configuración
- **Soporte para imágenes** del botón mediante Media Uploader
- **Texto del botón** personalizable
- **Placeholder del chat** personalizable
- **100% White-label** sin marcas de terceros

## 📋 Requisitos

- **WordPress**: 6.7 o superior (probado hasta 6.9)
- **PHP**: 8.3 o superior (probado con PHP 8.3.6)
- **Navegador moderno** con soporte para JavaScript ES6+

## 🚀 Instalación

### Desde WordPress Admin

1. Ve a **Plugins > Añadir nuevo**
2. Busca "WhatsApp Floating Chat for WordPress by CIDEAPPS"
3. Haz clic en **Instalar ahora**
4. Activa el plugin

### Instalación Manual

1. Descarga el plugin desde WordPress.org o GitHub
2. Sube la carpeta `cideapps-wa-widget` a `/wp-content/plugins/`
3. Activa el plugin desde el menú **Plugins** en WordPress

## ⚙️ Configuración

1. Ve a **Ajustes > WhatsApp Widget** en el menú de WordPress
2. Configura las siguientes opciones:

### Sección "Button"

- **Telephone**: Número de teléfono con código de país
  - Usa el selector de país para elegir tu país
  - Ingresa solo el número local (sin código de país)
  - El código de país se agrega automáticamente

- **Message**: Plantilla del mensaje que se enviará
  - Soporta placeholders: `{SITE}`, `{URL}`, `{TITLE}`
  - Ejemplo: `Hola! Te contacté desde {SITE} - {URL}`

- **Image**: Imagen personalizada para el botón flotante
  - Si no se selecciona, se usa el ícono predeterminado de WhatsApp

- **Tooltip**: Texto que aparece junto al botón
  - Ejemplo: "¿Necesitas ayuda?"

- **Position on Screen**: Posición del botón (Izquierda/Derecha)

- **Button Delay**: Segundos antes de mostrar el botón
  - Usa `-1` para mostrar inmediatamente sin animación

- **Badge**: Número opcional para mostrar en el botón (0-999)
  - Déjalo vacío para ocultar

### Sección "Chat Window"

- **Call to Action**: Texto que aparece en la burbuja del chat
  - Ejemplo: "¡Hola! ¿Cómo podemos ayudarte?"

- **Button Text**: Texto del botón de enviar
  - Ejemplo: "Enviar"

- **Theme Color**: Color del tema (header y botones)
  - Color por defecto: `#25d366` (verde de WhatsApp)

- **Agent Name**: Nombre del agente que aparece en el header
  - Ejemplo: "Soporte"

- **Agent Status**: Estado del agente (ej: "Online", "Disponible")

- **Agent Avatar**: Imagen del avatar del agente
  - Si no se selecciona, se generan iniciales automáticamente

- **Chat Placeholder**: Texto placeholder del campo de mensaje
  - Ejemplo: "Escribe tu mensaje..."

- **Chat Background Mode**: Fondo del chat
  - **Plugin Default**: Usa la imagen predeterminada
  - **Custom**: Sube tu propia imagen de fondo

## 🎯 Uso

Una vez configurado, el widget aparecerá automáticamente en tu sitio web:

1. El botón flotante aparecerá en la posición configurada
2. Al hacer clic, se abre la ventana del chat
3. El usuario puede escribir su mensaje
4. Al hacer clic en "Enviar", se abre WhatsApp con el mensaje pre-configurado y el mensaje del usuario

### Placeholders Disponibles

- `{SITE}`: Nombre del sitio web
- `{URL}`: URL actual de la página
- `{TITLE}`: Título de la página actual

**Ejemplo de mensaje con placeholders:**
```
Hola! Te contacté desde {SITE} sobre la página: {TITLE}
URL: {URL}
```

## 🔒 Seguridad

Este plugin sigue las mejores prácticas de seguridad de WordPress:

- ✅ Sanitización completa de todos los inputs
- ✅ Escapado de todos los outputs
- ✅ Protección contra XSS
- ✅ Validación de URLs y datos antes de usar
- ✅ Nonces CSRF en todos los formularios
- ✅ Verificación de permisos en todas las funciones
- ✅ Código auditado según estándares de WordPress

## 🌐 Compatibilidad

- **WordPress**: 6.7, 6.8, 6.9
- **PHP**: 8.3+
- **Multisite**: Compatible
- **Temas**: Compatible con todos los temas
- **Plugins**: Sin conflictos conocidos

## 📦 Estructura del Plugin

```
cideapps-wa-widget/
├── admin/
│   ├── class-cideapps-wa-widget-admin.php
│   ├── css/
│   │   └── cideapps-wa-widget-admin.css
│   ├── js/
│   │   └── cideapps-wa-widget-admin.js
│   └── partials/
│       └── cideapps-wa-widget-admin-display.php
├── includes/
│   ├── class-cideapps-wa-widget.php
│   ├── class-cideapps-wa-widget-activator.php
│   ├── class-cideapps-wa-widget-deactivator.php
│   └── class-cideapps-wa-widget-i18n.php
├── public/
│   ├── class-cideapps-wa-widget-public.php
│   ├── css/
│   │   └── cideapps-wa-widget-public.css
│   ├── js/
│   │   └── cideapps-wa-widget-public.css
│   └── img/
│       └── background-whatsapp.jpg
├── languages/
│   └── cideapps-wa-widget.pot
├── cideapps-wa-widget.php
├── LICENSE.txt
├── README.txt
└── uninstall.php
```

## 🛠️ Desarrollo

### Tecnologías Utilizadas

- **WordPress Settings API**: Para la configuración del plugin
- **WordPress Media Uploader**: Para la selección de imágenes
- **intl-tel-input**: Para el selector de país (CDN, solo en admin)
- **Vanilla JavaScript**: Sin dependencias en frontend
- **CSS3**: Estilos modernos y responsive

### Estándares de Código

- WordPress Coding Standards
- PSR-12 (donde aplica)
- JavaScript ES6+
- HTML5 semántico

## 📝 Changelog

Ver [CHANGELOG.md](CHANGELOG.md) para el historial completo de versiones.

## 🤝 Soporte

- **Autor**: CIDEAPPS
- **Sitio web**: https://cideapps.com
- **Email**: marco.aspeitia@cideapps.com

## 📄 Licencia

Este plugin está licenciado bajo GPL v2 o posterior.

```
Copyright (C) 2024 CIDEAPPS

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

## 🙏 Créditos

- **WordPress Plugin Boilerplate**: Estructura base del plugin
- **intl-tel-input**: Librería para selector de país (solo en admin)

---

**Desarrollado con ❤️ por CIDEAPPS**

