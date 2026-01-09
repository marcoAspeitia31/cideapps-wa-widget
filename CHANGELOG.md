# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-XX

### Añadido

#### Funcionalidades Principales
- Widget flotante de WhatsApp completamente personalizable
- Botón flotante posicionable (izquierda/derecha)
- Tooltip personalizable con texto propio
- Ventana tipo chat con diseño similar a WhatsApp
- Badge opcional para mostrar notificaciones (0-999)
- Delay configurable del botón con animación

#### Configuración del Botón
- Campo de teléfono con selector de país (intl-tel-input)
- Soporte para 240+ países con banderas y códigos telefónicos
- Validación automática de números telefónicos
- Campo de mensaje con plantilla personalizable
- Soporte para placeholders dinámicos: `{SITE}`, `{URL}`, `{TITLE}`
- Selector de imagen para el botón (WordPress Media Uploader)
- Campo de tooltip personalizable
- Selector de posición (izquierda/derecha)
- Campo de delay del botón (segundos, -1 para sin animación)
- Campo de badge opcional (número 0-999)

#### Ventana del Chat
- Call to Action (CTA) personalizable en la burbuja del chat
- Texto del botón de enviar personalizable
- Color picker para el color del tema
- Campo de nombre del agente
- Campo de estado del agente (ej: "Online")
- Selector de avatar del agente (WordPress Media Uploader)
- Generación automática de avatar con iniciales si no hay imagen
- Placeholder del campo de mensaje personalizable
- Selector de modo de fondo (plugin default / custom)
- Selector de imagen de fondo personalizada

#### Características Técnicas
- Página de configuración usando WordPress Settings API
- Separación de código admin/public
- Uso de clases y estructura modular
- WordPress Media Uploader integrado
- Color picker de WordPress integrado
- Vanilla JavaScript en frontend (sin jQuery)
- Carga condicional de recursos (solo si hay teléfono)
- Localización y traducción preparada (archivo .pot)

#### Seguridad
- Sanitización completa de todos los inputs
- Escapado de todos los outputs
- Protección contra XSS en JavaScript
- Validación de URLs antes de usar
- Validación de colores hexadecimales
- Validación de números telefónicos
- Nonces CSRF en formularios
- Verificación de permisos en todas las funciones
- Validación de datos antes de guardar
- Código auditado según estándares de WordPress

#### Compatibilidad
- WordPress 6.7, 6.8, 6.9
- PHP 8.3.6 o superior
- Compatible con Multisite
- Compatible con todos los temas
- Sin conflictos conocidos con otros plugins

#### Funcionalidades Adicionales
- Botón "Test Number" en admin para verificar configuración
- Reemplazo automático de placeholders en mensajes
- Construcción automática de link de WhatsApp
- Manejo de errores en carga de imágenes
- Fallback para avatar si la imagen falla
- Auto-resize del textarea del mensaje
- Manejo de teclado (Enter para enviar)
- Persistencia de estado del chat (abierto/cerrado)

#### Estilos y Diseño
- Diseño responsive para móviles
- Animaciones suaves y transiciones
- Estilos modernos con CSS3
- Compatible con modo oscuro/claro
- Accesibilidad (ARIA labels, roles)
- Diseño similar a WhatsApp para familiaridad

#### Limpieza y Mantenimiento
- Archivo uninstall.php para limpiar datos al desinstalar
- Limpieza automática de opciones en desinstalación
- Soporte para Multisite en desinstalación
- No elimina imágenes de medios (pueden estar en uso)

### Corregido

- N/A (Versión inicial)

### Cambiado

- N/A (Versión inicial)

### Eliminado

- N/A (Versión inicial)

### Seguridad

- Implementación completa de sanitización y escapado
- Protección contra XSS en JavaScript
- Validación de todos los datos de entrada
- Validación de URLs y colores
- Nonces CSRF implementados
- Verificación de permisos en todas las funciones

## [Unreleased]

### Planeado para Futuras Versiones

- [ ] Reglas de visibilidad (mostrar/ocultar en páginas específicas)
- [ ] Soporte para múltiples agentes/departamentos
- [ ] Horarios de disponibilidad
- [ ] Mensajes automáticos según horario
- [ ] Analytics y estadísticas de clicks
- [ ] Integración con Google Analytics
- [ ] Soporte para múltiples idiomas (i18n completo)
- [ ] Modo oscuro/claro automático
- [ ] Personalización de animaciones
- [ ] Soporte para WhatsApp Business API
- [ ] Integración con formularios de contacto
- [ ] Shortcodes para mostrar/ocultar el widget

---

## Notas de Versión

### Versionado

Este proyecto usa [Semantic Versioning](https://semver.org/). El formato es `MAJOR.MINOR.PATCH`:
- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nuevas funcionalidades compatibles hacia atrás
- **PATCH**: Correcciones de bugs compatibles hacia atrás

### Compatibilidad

- **WordPress mínimo**: 6.7
- **WordPress máximo probado**: 6.9
- **PHP mínimo**: 8.3
- **PHP probado**: 8.3.6

### Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Sigue las WordPress Coding Standards
2. Mantén la compatibilidad hacia atrás
3. Documenta los cambios
4. Prueba tus cambios antes de enviar

---

**Última actualización**: 2024-12-XX

