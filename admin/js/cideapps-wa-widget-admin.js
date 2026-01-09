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
		var mediaUploader;
		var imageIdField = $('#cwaw_image_id');
		var imagePreview = $('#cwaw_image_preview');
		var removeButton = $('.cwaw-remove-image');

		$('.cwaw-select-image').on('click', function(e) {
			e.preventDefault();

			if (mediaUploader) {
				mediaUploader.open();
				return;
			}

			mediaUploader = wp.media({
				title: $(this).data('uploader-title') || 'Select Image',
				button: { text: 'Use this image' },
				multiple: false
			});

			mediaUploader.on('select', function() {
				var attachment = mediaUploader.state().get('selection').first().toJSON();
				imageIdField.val(attachment.id);
				imagePreview.html('<img src="' + attachment.sizes.thumbnail.url + '" style="max-width: 150px; height: auto; display: block; margin-bottom: 10px;" />');
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
		var avatarUploader;
		var avatarIdField = $('#cwaw_agent_avatar_id');
		var avatarPreview = $('#cwaw_agent_avatar_preview');
		var removeAvatarButton = $('.cwaw-remove-avatar');

		$('.cwaw-select-avatar').on('click', function(e) {
			e.preventDefault();

			if (avatarUploader) {
				avatarUploader.open();
				return;
			}

			avatarUploader = wp.media({
				title: $(this).data('uploader-title') || 'Select Avatar',
				button: { text: 'Use this image' },
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
		var chatBgUploader;
		var chatBgIdField = $('#cwaw_chat_bg_image_id');
		var chatBgPreview = $('#cwaw_chat_bg_preview');
		var removeChatBgButton = $('.cwaw-remove-chat-bg');

		$('.cwaw-select-chat-bg').on('click', function(e) {
			e.preventDefault();

			if (chatBgUploader) {
				chatBgUploader.open();
				return;
			}

			chatBgUploader = wp.media({
				title: $(this).data('uploader-title') || 'Select Background',
				button: { text: 'Use this image' },
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
	});

})( jQuery );
