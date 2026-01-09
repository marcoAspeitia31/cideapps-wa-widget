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

	// Función para obtener hora actual (HH:MM)
	function getCurrentTime() {
		var now = new Date();
		var hours = String( now.getHours() ).padStart( 2, '0' );
		var minutes = String( now.getMinutes() ).padStart( 2, '0' );
		return hours + ':' + minutes;
	}

	// Función para crear avatar fallback (iniciales)
	function createFallbackAvatar( name ) {
		var initials = name ? name.charAt( 0 ).toUpperCase() : 'A';
		var themeColor = ( settings.themeColor || '#25d366' ).replace( '#', '' );
		return 'data:image/svg+xml;base64,' + btoa(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
			'<circle cx="50" cy="50" r="50" fill="#' + themeColor + '"/>' +
			'<text x="50" y="50" font-size="40" font-family="Arial, sans-serif" fill="white" text-anchor="middle" dominant-baseline="central">' + initials + '</text>' +
			'</svg>'
		);
	}

	// Función para construir el link de WhatsApp con mensaje
	function buildWhatsAppLink( userMessage ) {
		var telephone = settings.telephone || '';
		var template = replacePlaceholders( settings.messageTemplate || '' );
		
		// Construir mensaje final: template + salto de línea + mensaje del usuario
		var finalMessage = '';
		if ( template ) {
			finalMessage = template;
		}
		if ( userMessage && userMessage.trim() ) {
			if ( finalMessage ) {
				finalMessage += '\n\n' + userMessage.trim();
			} else {
				finalMessage = userMessage.trim();
			}
		}
		
		var encodedMessage = encodeURIComponent( finalMessage );
		return 'https://wa.me/' + telephone + ( encodedMessage ? '?text=' + encodedMessage : '' );
	}

	// Auto-resize textarea
	function autoResizeTextarea( textarea ) {
		textarea.style.height = 'auto';
		textarea.style.height = Math.min( textarea.scrollHeight, 120 ) + 'px';
	}

	// Inicializar cuando el DOM esté listo
	function init() {
		var widget = document.getElementById( 'cwaw-widget' );
		var button = document.getElementById( 'cwaw-button' );
		var window = document.querySelector( '.cwaw-window' );
		var closeButton = document.querySelector( '.cwaw-window__close' );
		var messageInput = document.querySelector( '.cwaw-field__textarea' );
		var sendButton = document.querySelector( '.cwaw-send' );

		if ( ! widget || ! button || ! window ) {
			return;
		}

		// Poblar datos dinámicos
		var agentNameEl = window.querySelector( '.cwaw-window__name' );
		var agentStatusEl = window.querySelector( '.cwaw-window__status' );
		var agentAvatarEl = window.querySelector( '.cwaw-window__avatar-img' );
		var chatPlaceholderEl = messageInput;
		var bubbleContentEl = window.querySelector( '.cwaw-bubble__content' );
		var headerEl = window.querySelector( '.cwaw-window__header' );
		var chatEl = window.querySelector( '.cwaw-window__chat' );
		var timeEl = window.querySelector( '.cwaw-window__time' );

		if ( agentNameEl ) {
			agentNameEl.textContent = settings.agentName || 'Soporte';
		}

		if ( agentStatusEl ) {
			agentStatusEl.textContent = settings.agentStatus || 'Online';
		}

		if ( agentAvatarEl ) {
			if ( settings.agentAvatarUrl ) {
				agentAvatarEl.src = settings.agentAvatarUrl;
				agentAvatarEl.onerror = function() {
					this.src = createFallbackAvatar( settings.agentName );
				};
			} else {
				agentAvatarEl.src = createFallbackAvatar( settings.agentName );
			}
		}

		if ( chatPlaceholderEl ) {
			chatPlaceholderEl.placeholder = settings.chatPlaceholder || 'Enter your message...';
		}

		if ( bubbleContentEl && settings.cta ) {
			// Respetar saltos de línea en el CTA
			var ctaText = settings.cta.replace( /\n/g, '<br>' );
			bubbleContentEl.innerHTML = ctaText;
		}

		if ( headerEl && settings.themeColor ) {
			headerEl.style.backgroundColor = settings.themeColor;
		}

		if ( chatEl && settings.chatBgUrl ) {
			chatEl.style.backgroundImage = 'url(' + settings.chatBgUrl + ')';
		}

		if ( timeEl ) {
			timeEl.textContent = getCurrentTime();
		}

		// Auto-resize textarea
		if ( messageInput ) {
			messageInput.addEventListener( 'input', function() {
				autoResizeTextarea( this );
			} );

			// Permitir enviar con Enter (sin Shift/Ctrl)
			messageInput.addEventListener( 'keydown', function( e ) {
				if ( e.key === 'Enter' && ! e.ctrlKey && ! e.shiftKey ) {
					e.preventDefault();
					if ( sendButton ) {
						sendButton.click();
					}
				}
			} );
		}

		// Manejar envío del mensaje
		if ( sendButton ) {
			sendButton.addEventListener( 'click', function( e ) {
				e.preventDefault();
				
				var userMessage = messageInput ? messageInput.value.trim() : '';
				
				// Construir y abrir link de WhatsApp
				var whatsappLink = buildWhatsAppLink( userMessage );
				window.open( whatsappLink, '_blank', 'noopener,noreferrer' );
			} );
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
			button.parentElement.style.opacity = '1';
			button.parentElement.style.transform = 'scale(1)';
		} else {
			widget.classList.add( 'cwaw-delayed' );
		}

		// Abrir/cerrar ventana de chat
		function toggleChatWindow() {
			var wasHidden = window.hasAttribute( 'hidden' );
			
			if ( wasHidden ) {
				window.removeAttribute( 'hidden' );
				window.classList.add( 'cwaw-open' );
				
				// Enfocar input cuando se abre
				setTimeout( function() {
					if ( messageInput ) {
						messageInput.focus();
						autoResizeTextarea( messageInput );
					}
				}, 150 );
			} else {
				window.setAttribute( 'hidden', '' );
				window.classList.remove( 'cwaw-open' );
			}
			
			// Guardar estado
			localStorage.setItem( 'cwaw_chat_open', window.hasAttribute( 'hidden' ) ? 'false' : 'true' );
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
				window.setAttribute( 'hidden', '' );
				window.classList.remove( 'cwaw-open' );
				localStorage.setItem( 'cwaw_chat_open', 'false' );
			} );
		}

		// Cerrar al hacer click fuera de la ventana
		document.addEventListener( 'click', function( e ) {
			if ( ! window.hasAttribute( 'hidden' ) ) {
				if ( ! window.contains( e.target ) && ! button.contains( e.target ) ) {
					window.setAttribute( 'hidden', '' );
					window.classList.remove( 'cwaw-open' );
					localStorage.setItem( 'cwaw_chat_open', 'false' );
				}
			}
		} );

		// Manejar tecla Escape para cerrar
		document.addEventListener( 'keydown', function( e ) {
			if ( e.key === 'Escape' && ! window.hasAttribute( 'hidden' ) ) {
				window.setAttribute( 'hidden', '' );
				window.classList.remove( 'cwaw-open' );
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
