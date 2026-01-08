(function( $ ) {
	'use strict';

	$(document).ready(function() {
		// Inicializar color picker
		if ($.fn.wpColorPicker) {
			$('.cwaw-color-picker').wpColorPicker();
		}

		// Media uploader para imagen del botón
		var mediaUploader;
		var imageIdField = $('#cwaw_image_id');
		var imagePreview = $('#cwaw_image_preview');
		var removeButton = $('.cwaw-remove-image');

		// Seleccionar imagen
		$('.cwaw-select-image').on('click', function(e) {
			e.preventDefault();

			// Si el media uploader ya existe, reabrirlo
			if (mediaUploader) {
				mediaUploader.open();
				return;
			}

			// Crear el media uploader
			mediaUploader = wp.media({
				title: $(this).data('uploader-title') || 'Select Image',
				button: {
					text: 'Use this image'
				},
				multiple: false
			});

			// Cuando se selecciona una imagen
			mediaUploader.on('select', function() {
				var attachment = mediaUploader.state().get('selection').first().toJSON();
				imageIdField.val(attachment.id);
				
				// Mostrar preview
				imagePreview.html('<img src="' + attachment.sizes.thumbnail.url + '" style="max-width: 150px; height: auto; display: block; margin-bottom: 10px;" />');
				
				// Mostrar botón de eliminar
				removeButton.show();
			});

			// Abrir el media uploader
			mediaUploader.open();
		});

		// Remover imagen
		$('.cwaw-remove-image').on('click', function(e) {
			e.preventDefault();
			imageIdField.val('');
			imagePreview.html('');
			$(this).hide();
		});
	});

})( jQuery );
