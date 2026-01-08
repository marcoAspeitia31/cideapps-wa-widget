(function() {
	'use strict';

	// Verificar que las configuraciones estén disponibles
	if ( typeof cwawSettings === 'undefined' ) {
		return;
	}

	var settings = cwawSettings;

	// Función para reemplazar placeholders
	function replacePlaceholders( text ) {
		if ( ! text ) {
			return '';
		}

		return text
			.replace( /\{SITE\}/g, settings.siteName || '' )
			.replace( /\{URL\}/g, settings.currentUrl || '' )
			.replace( /\{TITLE\}/g, settings.currentTitle || '' );
	}

	// Función para construir el link de WhatsApp
	function buildWhatsAppLink() {
		var telephone = settings.telephone || '';
		var message = replacePlaceholders( settings.message || '' );
		var encodedMessage = encodeURIComponent( message );
		return 'https://wa.me/' + telephone + ( encodedMessage ? '?text=' + encodedMessage : '' );
	}

	// Inicializar cuando el DOM esté listo
	function init() {
		var widget = document.getElementById( 'cwaw-widget' );
		var button = document.getElementById( 'cwaw-button' );
		var chatWindow = document.getElementById( 'cwaw-chat-window' );
		var closeButton = document.getElementById( 'cwaw-close' );
		var whatsappLink = document.getElementById( 'cwaw-whatsapp-link' );

		if ( ! widget || ! button || ! chatWindow ) {
			return;
		}

		// Configurar link de WhatsApp
		if ( whatsappLink ) {
			whatsappLink.href = buildWhatsAppLink();
		}

		// Manejar delay del botón
		var buttonDelay = settings.buttonDelay || 0;
		if ( buttonDelay > 0 ) {
			button.parentElement.style.opacity = '0';
			button.parentElement.style.transform = 'scale(0.5)';
			
			setTimeout( function() {
				button.parentElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
				button.parentElement.style.opacity = '1';
				button.parentElement.style.transform = 'scale(1)';
			}, buttonDelay * 1000 );
		} else if ( buttonDelay === -1 ) {
			// Mostrar inmediatamente sin animación
			button.parentElement.style.opacity = '1';
			button.parentElement.style.transform = 'scale(1)';
		} else {
			// Animación por defecto
			widget.classList.add( 'cwaw-delayed' );
		}

		// Abrir/cerrar ventana de chat
		function toggleChatWindow() {
			chatWindow.classList.toggle( 'cwaw-open' );
			
			// Guardar estado en localStorage (opcional para persistencia)
			if ( chatWindow.classList.contains( 'cwaw-open' ) ) {
				localStorage.setItem( 'cwaw_chat_open', 'true' );
			} else {
				localStorage.setItem( 'cwaw_chat_open', 'false' );
			}
		}

		// Event listeners
		if ( button ) {
			button.addEventListener( 'click', function( e ) {
				e.preventDefault();
				toggleChatWindow();
			} );
		}

		if ( closeButton ) {
			closeButton.addEventListener( 'click', function( e ) {
				e.preventDefault();
				chatWindow.classList.remove( 'cwaw-open' );
				localStorage.setItem( 'cwaw_chat_open', 'false' );
			} );
		}

		// Cerrar al hacer click fuera de la ventana
		document.addEventListener( 'click', function( e ) {
			if ( chatWindow.classList.contains( 'cwaw-open' ) ) {
				if ( ! chatWindow.contains( e.target ) && ! button.contains( e.target ) ) {
					chatWindow.classList.remove( 'cwaw-open' );
					localStorage.setItem( 'cwaw_chat_open', 'false' );
				}
			}
		} );

		// Manejar tecla Escape para cerrar
		document.addEventListener( 'keydown', function( e ) {
			if ( e.key === 'Escape' && chatWindow.classList.contains( 'cwaw-open' ) ) {
				chatWindow.classList.remove( 'cwaw-open' );
				localStorage.setItem( 'cwaw_chat_open', 'false' );
			}
		} );
	}

	// Inicializar cuando el DOM esté listo
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

})();
