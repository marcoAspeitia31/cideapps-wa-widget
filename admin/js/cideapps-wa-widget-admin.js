(function( $ ) {
	'use strict';

	$(document).ready(function() {
		// Inicializar color picker
		if ($.fn.wpColorPicker) {
			$('.cwaw-color-picker').wpColorPicker();
		}

		// Toggle chat bg mode
		$('#cwaw_chat_bg_mode').on('change', function() {
			if ($(this).val() === 'custom') {
				$('#cwaw_chat_bg_wrapper').show();
			} else {
				$('#cwaw_chat_bg_wrapper').hide();
			}
		});

		// Media uploader para imagen del botón
		var imageIdField = $('#cwaw_image_id');
		var imagePreview = $('#cwaw_image_preview');
		var removeButton = $('.cwaw-remove-image');

		$('.cwaw-select-image').on('click', function(e) {
			e.preventDefault();

			var uploaderTitle = $(this).data('uploader-title') || 'Select Image';
			var mediaUploader = wp.media({
				title: uploaderTitle,
				button: {
					text: 'Use this image'
				},
				multiple: false
			});

			mediaUploader.on('select', function() {
				var attachment = mediaUploader.state().get('selection').first().toJSON();
				var thumbUrl = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
				imageIdField.val(attachment.id);
				imagePreview.html('<img src="' + thumbUrl + '" style="max-width: 150px; height: auto; display: block; margin-bottom: 10px;" />');
				removeButton.show();
			});

			mediaUploader.open();
		});

		$('.cwaw-remove-image').on('click', function(e) {
			e.preventDefault();
			imageIdField.val('');
			imagePreview.html('');
			$(this).hide();
		});

		// Media uploader para avatar del agente
		var avatarIdField = $('#cwaw_agent_avatar_id');
		var avatarPreview = $('#cwaw_agent_avatar_preview');
		var removeAvatarButton = $('.cwaw-remove-avatar');

		$('.cwaw-select-avatar').on('click', function(e) {
			e.preventDefault();

			var uploaderTitle = $(this).data('uploader-title') || 'Select Avatar';
			var avatarUploader = wp.media({
				title: uploaderTitle,
				button: {
					text: 'Use this image'
				},
				multiple: false
			});

			avatarUploader.on('select', function() {
				var attachment = avatarUploader.state().get('selection').first().toJSON();
				var thumbUrl = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
				avatarIdField.val(attachment.id);
				avatarPreview.html('<img src="' + thumbUrl + '" style="max-width: 80px; height: 80px; width: 80px; object-fit: cover; border-radius: 50%; display: block; margin-bottom: 10px; border: 2px solid #ddd;" />');
				removeAvatarButton.show();
			});

			avatarUploader.open();
		});

		$('.cwaw-remove-avatar').on('click', function(e) {
			e.preventDefault();
			avatarIdField.val('');
			avatarPreview.html('');
			$(this).hide();
		});

		// Media uploader para background del chat
		var chatBgIdField = $('#cwaw_chat_bg_image_id');
		var chatBgPreview = $('#cwaw_chat_bg_preview');
		var removeChatBgButton = $('.cwaw-remove-chat-bg');

		$('.cwaw-select-chat-bg').on('click', function(e) {
			e.preventDefault();

			var uploaderTitle = $(this).data('uploader-title') || 'Select Background';
			var chatBgUploader = wp.media({
				title: uploaderTitle,
				button: {
					text: 'Use this image'
				},
				multiple: false
			});

			chatBgUploader.on('select', function() {
				var attachment = chatBgUploader.state().get('selection').first().toJSON();
				chatBgIdField.val(attachment.id);
				chatBgPreview.html('<img src="' + attachment.url + '" style="max-width: 200px; height: auto; display: block; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;" />');
				removeChatBgButton.show();
			});

			chatBgUploader.open();
		});

		$('.cwaw-remove-chat-bg').on('click', function(e) {
			e.preventDefault();
			chatBgIdField.val('');
			chatBgPreview.html('');
			$(this).hide();
		});

		// Inicializar intl-tel-input para el campo de teléfono
		var phoneInput = $('#cwaw_telephone');
		var countryCodeField = $('#cwaw_country_code');
		var testNumberResult = $('#cwaw-test-number-result');
		var iti = null;
		
		if (phoneInput.length && typeof intlTelInput !== 'undefined') {
			// Obtener país inicial desde data attribute o hidden field
			var initialCountry = phoneInput.data('initial-country') || countryCodeField.val() || 'mx';
			
			// Inicializar intl-tel-input
			iti = intlTelInput(phoneInput[0], {
				initialCountry: initialCountry,
				utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.0/build/js/utils.js',
				separateDialCode: true,
				preferredCountries: ['mx', 'us', 'es', 'ar', 'co', 'cl', 'pe', 'ec', 've'],
				onlyCountries: [], // Permitir todos los países
			});

			// Actualizar country_code cuando cambia el país
			phoneInput.on('countrychange', function() {
				var countryData = iti.getSelectedCountryData();
				if (countryData && countryData.iso2) {
					countryCodeField.val(countryData.iso2);
				}
			});

			// Validar número mientras se escribe
			phoneInput.on('input', function() {
				testNumberResult.text('').css('color', '');
			});

			// Al guardar el formulario, extraer solo el número local (sin código de país)
			$('form').on('submit', function() {
				if (iti && typeof iti.getNumber === 'function') {
					try {
						var fullNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
						if (fullNumber) {
							// Remover el + y el código de país
							var countryData = iti.getSelectedCountryData();
							if (countryData && countryData.dialCode) {
								var cleanNumber = fullNumber.replace(/^\+/, ''); // Remover +
								// Si el número comienza con el código de país, removerlo
								if (cleanNumber.indexOf(countryData.dialCode) === 0) {
									var localNumber = cleanNumber.substring(countryData.dialCode.length);
									// Actualizar el campo oculto con solo el número local
									phoneInput.val(localNumber);
								}
							}
						}
					} catch(err) {
						// Si hay error, intentar limpiar el número
						var number = phoneInput.val().replace(/[^0-9]/g, '');
						var countryData = iti.getSelectedCountryData();
						if (countryData && countryData.dialCode) {
							// Remover código de país si está al inicio
							if (number.indexOf(countryData.dialCode) === 0) {
								number = number.substring(countryData.dialCode.length);
							}
							phoneInput.val(number);
						}
					}
				}
			});
		}

		// Botón Test Number - abre WhatsApp con el número configurado
		$('#cwaw-test-number').on('click', function(e) {
			e.preventDefault();
			
			if (!phoneInput.length) {
				return;
			}

			var fullNumber = '';
			var telephoneNumber = '';
			
			// Obtener número desde intl-tel-input si está disponible
			if (iti && typeof iti.getNumber === 'function') {
				try {
					if (iti.isValidNumber()) {
						// Número válido: obtener en formato E.164
						fullNumber = iti.getNumber();
						telephoneNumber = fullNumber.replace(/^\+/, ''); // Remover el +
					} else {
						// Número inválido pero intentar usar lo que haya
						var number = phoneInput.val().trim();
						if (!number) {
							testNumberResult.text('⚠️ ' + iti.getValidationError() || 'Please enter a valid phone number').css('color', '#d63638');
							return;
						}
						var countryData = iti.getSelectedCountryData();
						if (countryData && countryData.dialCode) {
							// Limpiar número (remover espacios, guiones, etc.)
							var cleanNumber = number.replace(/[^0-9]/g, '');
							// Remover código de país si está al inicio
							if (cleanNumber.indexOf(countryData.dialCode) === 0) {
								cleanNumber = cleanNumber.substring(countryData.dialCode.length);
							}
							telephoneNumber = countryData.dialCode + cleanNumber;
							fullNumber = '+' + telephoneNumber;
						} else {
							testNumberResult.text('⚠️ Please select a country').css('color', '#d63638');
							return;
						}
					}
				} catch(err) {
					// Fallback si hay error
					var number = phoneInput.val().replace(/[^0-9]/g, '');
					var countryData = iti.getSelectedCountryData();
					if (countryData && countryData.dialCode && number) {
						telephoneNumber = countryData.dialCode + number;
						fullNumber = '+' + telephoneNumber;
					} else {
						testNumberResult.text('⚠️ Please enter a valid phone number').css('color', '#d63638');
						return;
					}
				}
			} else {
				// Fallback: obtener valores directamente de los campos
				telephoneNumber = phoneInput.val().replace(/[^0-9]/g, '');
				var countryCode = countryCodeField.val() || 'mx';
				
				if (!telephoneNumber || telephoneNumber.trim() === '') {
					testNumberResult.text('⚠️ Please enter a phone number').css('color', '#d63638');
					return;
				}
				
				// Mapeo básico de códigos de país ISO a códigos telefónicos
				var countryDialCodes = {
					'mx': '52', 'us': '1', 'ca': '1', 'gb': '44', 'es': '34', 'ar': '54', 'br': '55',
					'cl': '56', 'co': '57', 'pe': '51', 've': '58', 'ec': '593', 'py': '595',
					'uy': '598', 'bo': '591', 'cr': '506', 'pa': '507', 'ni': '505', 'gt': '502',
					'sv': '503', 'hn': '504', 'do': '1', 'pr': '1', 'cu': '53'
				};
				
				var dialCode = countryDialCodes[countryCode] || '52';
				telephoneNumber = dialCode + telephoneNumber;
				fullNumber = '+' + telephoneNumber;
			}

			// Validar que tengamos un número
			telephoneNumber = telephoneNumber.replace(/[^0-9]/g, '');
			if (!telephoneNumber || telephoneNumber.length < 8) {
				testNumberResult.text('⚠️ Please enter a valid phone number').css('color', '#d63638');
				return;
			}

			// Obtener template de mensaje
			var messageField = $('textarea[name="cwaw_settings[message]"]');
			var messageTemplate = (typeof cwawAdmin !== 'undefined' && cwawAdmin.messageTemplate) ? cwawAdmin.messageTemplate : (messageField.val() || '');
			
			// Reemplazar placeholders
			var siteName = (typeof cwawAdmin !== 'undefined' && cwawAdmin.siteName) ? cwawAdmin.siteName : '';
			var currentUrl = (typeof cwawAdmin !== 'undefined' && cwawAdmin.adminUrl) ? cwawAdmin.adminUrl : window.location.href;
			var currentTitle = siteName + ' - Settings';
			
			var finalMessage = messageTemplate
				.replace(/\{SITE\}/g, siteName)
				.replace(/\{URL\}/g, currentUrl)
				.replace(/\{TITLE\}/g, currentTitle);
			
			// Construir link de WhatsApp (solo dígitos)
			var encodedMessage = encodeURIComponent(finalMessage);
			var whatsappLink = 'https://wa.me/' + telephoneNumber + (encodedMessage ? '?text=' + encodedMessage : '');
			
			// Abrir WhatsApp
			window.open(whatsappLink, '_blank', 'noopener,noreferrer');
			
			// Mostrar confirmación
			testNumberResult.text('✓ Opening WhatsApp with ' + (fullNumber || '+' + telephoneNumber)).css('color', '#00a32a');
			setTimeout(function() {
				testNumberResult.text('');
			}, 4000);
		});
	});

})( jQuery );
