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
		// Usar fullNumber si está disponible, sino construir desde dialCode + telephone
		var fullNumber = settings.fullNumber || '';
		
		if ( ! fullNumber ) {
			var dialCode = settings.dialCode || '';
			var telephone = settings.telephone || '';
			fullNumber = dialCode && telephone ? dialCode + telephone : telephone;
		}
		
		// Validar que tengamos un número (solo dígitos, mínimo 7 dígitos para ser un número válido)
		fullNumber = fullNumber.replace( /[^0-9]/g, '' );
		if ( ! fullNumber || fullNumber.length < 7 ) {
			// Número inválido o muy corto, retornar vacío
			return '';
		}
		
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
		return 'https://wa.me/' + fullNumber + ( encodedMessage ? '?text=' + encodedMessage : '' );
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
		var chatWindow = document.querySelector( '.cwaw-window' );
		var closeButton = document.querySelector( '.cwaw-window__close' );
		var messageInput = document.querySelector( '.cwaw-field__textarea' );
		var sendButton = document.querySelector( '.cwaw-send' );

		if ( ! widget || ! button || ! chatWindow ) {
			return;
		}

		// Poblar datos dinámicos
		var agentNameEl = chatWindow.querySelector( '.cwaw-window__name' );
		var agentStatusEl = chatWindow.querySelector( '.cwaw-window__status' );
		var agentAvatarEl = chatWindow.querySelector( '.cwaw-window__avatar-img' );
		var chatPlaceholderEl = messageInput;
		var bubbleContentEl = chatWindow.querySelector( '.cwaw-bubble__content' );
		var headerEl = chatWindow.querySelector( '.cwaw-window__header' );
		var chatEl = chatWindow.querySelector( '.cwaw-window__chat' );
		var timeEl = chatWindow.querySelector( '.cwaw-window__time' );

		if ( agentNameEl ) {
			agentNameEl.textContent = settings.agentName || 'Soporte';
		}

		if ( agentStatusEl ) {
			agentStatusEl.textContent = settings.agentStatus || 'Online';
		}

		if ( agentAvatarEl ) {
			if ( settings.agentAvatarUrl ) {
				// Validar que sea una URL válida antes de usar
				try {
					new URL( settings.agentAvatarUrl );
					agentAvatarEl.src = settings.agentAvatarUrl;
					agentAvatarEl.onerror = function() {
						// Fallback a avatar generado si la imagen falla al cargar
						this.src = createFallbackAvatar( settings.agentName );
					};
				} catch ( e ) {
					// Si la URL no es válida, usar avatar generado
					agentAvatarEl.src = createFallbackAvatar( settings.agentName );
				}
			} else {
				agentAvatarEl.src = createFallbackAvatar( settings.agentName );
			}
		}

		if ( chatPlaceholderEl ) {
			chatPlaceholderEl.placeholder = settings.chatPlaceholder || 'Enter your message...';
		}

		if ( bubbleContentEl && settings.cta ) {
			// Limpiar contenido previo
			bubbleContentEl.textContent = '';
			
			// Dividir por saltos de línea y crear nodos de texto con <br> entre ellos
			var lines = settings.cta.split( '\n' );
			lines.forEach( function( line, index ) {
				if ( index > 0 ) {
					// Agregar salto de línea como elemento <br> de forma segura
					var br = document.createElement( 'br' );
					bubbleContentEl.appendChild( br );
				}
				// Crear nodo de texto de forma segura (escapa automáticamente)
				var textNode = document.createTextNode( line );
				bubbleContentEl.appendChild( textNode );
			} );
		}

		if ( headerEl && settings.themeColor ) {
			// Validar que sea un color hexadecimal válido antes de aplicar
			if ( /^#[0-9A-F]{6}$/i.test( settings.themeColor ) ) {
				headerEl.style.backgroundColor = settings.themeColor;
			}
		}

		if ( chatEl && settings.chatBgUrl ) {
			// Validar que sea una URL válida antes de usar en CSS
			try {
				// Intentar crear un objeto URL para validar
				new URL( settings.chatBgUrl );
				// Escapar URL para uso seguro en CSS
				var escapedUrl = settings.chatBgUrl.replace( /'/g, "\\'" ).replace( /"/g, '\\"' );
				chatEl.style.backgroundImage = 'url("' + escapedUrl + '")';
			} catch ( e ) {
				// Si la URL no es válida, no aplicar background
				console.warn( 'Invalid chat background URL:', settings.chatBgUrl );
			}
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
				
				// Validar que el link sea válido antes de abrirlo
				if ( whatsappLink && whatsappLink.startsWith( 'https://wa.me/' ) ) {
					try {
						// Validar que sea una URL válida
						new URL( whatsappLink );
						window.open( whatsappLink, '_blank', 'noopener,noreferrer' );
					} catch ( urlError ) {
						console.error( 'Invalid WhatsApp link:', whatsappLink );
					}
				} else {
					console.error( 'Invalid WhatsApp link format:', whatsappLink );
				}
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
			var wasHidden = chatWindow.hasAttribute( 'hidden' );
			
			if ( wasHidden ) {
				chatWindow.removeAttribute( 'hidden' );
				chatWindow.classList.add( 'cwaw-open' );
				
				// Enfocar input cuando se abre
				setTimeout( function() {
					if ( messageInput ) {
						messageInput.focus();
						autoResizeTextarea( messageInput );
					}
				}, 150 );
			} else {
				chatWindow.setAttribute( 'hidden', '' );
				chatWindow.classList.remove( 'cwaw-open' );
			}
			
			// Guardar estado
			localStorage.setItem( 'cwaw_chat_open', chatWindow.hasAttribute( 'hidden' ) ? 'false' : 'true' );
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
				chatWindow.setAttribute( 'hidden', '' );
				chatWindow.classList.remove( 'cwaw-open' );
				localStorage.setItem( 'cwaw_chat_open', 'false' );
			} );
		}

		// Cerrar al hacer click fuera de la ventana
		document.addEventListener( 'click', function( e ) {
			if ( ! chatWindow.hasAttribute( 'hidden' ) ) {
				if ( ! chatWindow.contains( e.target ) && ! button.contains( e.target ) ) {
					chatWindow.setAttribute( 'hidden', '' );
					chatWindow.classList.remove( 'cwaw-open' );
					localStorage.setItem( 'cwaw_chat_open', 'false' );
				}
			}
		} );

		// Manejar tecla Escape para cerrar
		document.addEventListener( 'keydown', function( e ) {
			if ( e.key === 'Escape' && ! chatWindow.hasAttribute( 'hidden' ) ) {
				chatWindow.setAttribute( 'hidden', '' );
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
