<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://cideapps.com
 * @since      1.0.0
 *
 * @package    Cideapps_Wa_Widget
 * @subpackage Cideapps_Wa_Widget/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Cideapps_Wa_Widget
 * @subpackage Cideapps_Wa_Widget/admin
 * @author     CIDEAPPS <marco.aspeitia@cideapps.com>
 */
class Cideapps_Wa_Widget_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles( $hook ) {
		// Solo cargar en la página de configuración del plugin
		if ( 'settings_page_cideapps-wa-widget' !== $hook ) {
			return;
		}

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/cideapps-wa-widget-admin.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts( $hook ) {
		// Solo cargar en la página de configuración del plugin
		if ( 'settings_page_cideapps-wa-widget' !== $hook ) {
			return;
		}

		wp_enqueue_media();
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/cideapps-wa-widget-admin.js', array( 'jquery', 'wp-color-picker', 'media-upload', 'media-views' ), $this->version, false );
		wp_enqueue_style( 'wp-color-picker' );
	}

	/**
	 * Register the administration menu for this plugin into the WordPress Dashboard menu.
	 *
	 * @since    1.0.0
	 */
	public function add_plugin_admin_menu() {
		add_options_page(
			__( 'CIDEAPPS WhatsApp Widget Settings', 'cideapps-wa-widget' ),
			__( 'WhatsApp Widget', 'cideapps-wa-widget' ),
			'manage_options',
			$this->plugin_name,
			array( $this, 'display_plugin_setup_page' )
		);
	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @since    1.0.0
	 */
	public function add_action_links( $links ) {
		$settings_link = array(
			'<a href="' . admin_url( 'options-general.php?page=' . $this->plugin_name ) . '">' . __( 'Settings', 'cideapps-wa-widget' ) . '</a>',
		);
		return array_merge( $settings_link, $links );
	}

	/**
	 * Render the settings page for this plugin.
	 *
	 * @since    1.0.0
	 */
	public function display_plugin_setup_page() {
		$plugin_name = $this->plugin_name;
		include_once 'partials/cideapps-wa-widget-admin-display.php';
	}

	/**
	 * Register all settings using WordPress Settings API.
	 *
	 * @since    1.0.0
	 */
	public function register_settings() {
		// Registrar la opción única
		register_setting(
			'cwaw_settings',
			'cwaw_settings',
			array( $this, 'sanitize_settings' )
		);

		// Sección Button
		add_settings_section(
			'cwaw_button_section',
			__( 'Button', 'cideapps-wa-widget' ),
			array( $this, 'button_section_callback' ),
			$this->plugin_name
		);

		// Campos de Button
		add_settings_field(
			'telephone',
			__( 'Telephone', 'cideapps-wa-widget' ),
			array( $this, 'telephone_field_callback' ),
			$this->plugin_name,
			'cwaw_button_section'
		);

		add_settings_field(
			'message',
			__( 'Message', 'cideapps-wa-widget' ),
			array( $this, 'message_field_callback' ),
			$this->plugin_name,
			'cwaw_button_section'
		);

		add_settings_field(
			'image',
			__( 'Image', 'cideapps-wa-widget' ),
			array( $this, 'image_field_callback' ),
			$this->plugin_name,
			'cwaw_button_section'
		);

		add_settings_field(
			'tooltip',
			__( 'Tooltip', 'cideapps-wa-widget' ),
			array( $this, 'tooltip_field_callback' ),
			$this->plugin_name,
			'cwaw_button_section'
		);

		add_settings_field(
			'position',
			__( 'Position on Screen', 'cideapps-wa-widget' ),
			array( $this, 'position_field_callback' ),
			$this->plugin_name,
			'cwaw_button_section'
		);

		add_settings_field(
			'button_delay',
			__( 'Button Delay (seconds)', 'cideapps-wa-widget' ),
			array( $this, 'button_delay_field_callback' ),
			$this->plugin_name,
			'cwaw_button_section'
		);

		add_settings_field(
			'badge',
			__( 'Badge', 'cideapps-wa-widget' ),
			array( $this, 'badge_field_callback' ),
			$this->plugin_name,
			'cwaw_button_section'
		);

		// Sección Chat Window
		add_settings_section(
			'cwaw_chat_window_section',
			__( 'Chat Window', 'cideapps-wa-widget' ),
			array( $this, 'chat_window_section_callback' ),
			$this->plugin_name
		);

		add_settings_field(
			'cta',
			__( 'Call to Action', 'cideapps-wa-widget' ),
			array( $this, 'cta_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'button_text',
			__( 'Button Text', 'cideapps-wa-widget' ),
			array( $this, 'button_text_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'theme_color',
			__( 'Theme Color', 'cideapps-wa-widget' ),
			array( $this, 'theme_color_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'agent_name',
			__( 'Agent Name', 'cideapps-wa-widget' ),
			array( $this, 'agent_name_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'agent_status',
			__( 'Agent Status', 'cideapps-wa-widget' ),
			array( $this, 'agent_status_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'agent_avatar_id',
			__( 'Agent Avatar', 'cideapps-wa-widget' ),
			array( $this, 'agent_avatar_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'chat_placeholder',
			__( 'Chat Placeholder', 'cideapps-wa-widget' ),
			array( $this, 'chat_placeholder_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'chat_bg_mode',
			__( 'Chat Background Mode', 'cideapps-wa-widget' ),
			array( $this, 'chat_bg_mode_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);

		add_settings_field(
			'chat_bg_image_id',
			__( 'Custom Chat Background', 'cideapps-wa-widget' ),
			array( $this, 'chat_bg_image_field_callback' ),
			$this->plugin_name,
			'cwaw_chat_window_section'
		);
	}

	/**
	 * Sanitize settings callback.
	 *
	 * @since    1.0.0
	 */
	public function sanitize_settings( $input ) {
		$sanitized = array();

		// Button section
		$sanitized['telephone'] = isset( $input['telephone'] ) ? preg_replace( '/[^0-9]/', '', sanitize_text_field( $input['telephone'] ) ) : '';
		$sanitized['message'] = isset( $input['message'] ) ? wp_kses_post( $input['message'] ) : '';
		$sanitized['image'] = isset( $input['image'] ) ? absint( $input['image'] ) : 0;
		$sanitized['tooltip'] = isset( $input['tooltip'] ) ? sanitize_text_field( $input['tooltip'] ) : '';
		$sanitized['position'] = isset( $input['position'] ) && in_array( $input['position'], array( 'left', 'right' ), true ) ? $input['position'] : 'right';
		$sanitized['button_delay'] = isset( $input['button_delay'] ) ? intval( $input['button_delay'] ) : 0;
		$sanitized['badge'] = isset( $input['badge'] ) ? sanitize_text_field( $input['badge'] ) : '';

		// Chat Window section
		$sanitized['cta'] = isset( $input['cta'] ) ? wp_kses_post( $input['cta'] ) : '';
		$sanitized['button_text'] = isset( $input['button_text'] ) ? sanitize_text_field( $input['button_text'] ) : '';
		$sanitized['theme_color'] = isset( $input['theme_color'] ) ? sanitize_hex_color( $input['theme_color'] ) : '#25d366';
		$sanitized['agent_name'] = isset( $input['agent_name'] ) ? sanitize_text_field( $input['agent_name'] ) : __( 'Soporte', 'cideapps-wa-widget' );
		$sanitized['agent_status'] = isset( $input['agent_status'] ) ? sanitize_text_field( $input['agent_status'] ) : __( 'Online', 'cideapps-wa-widget' );
		$sanitized['agent_avatar_id'] = isset( $input['agent_avatar_id'] ) ? absint( $input['agent_avatar_id'] ) : 0;
		$sanitized['chat_placeholder'] = isset( $input['chat_placeholder'] ) ? sanitize_text_field( $input['chat_placeholder'] ) : __( 'Enter your message...', 'cideapps-wa-widget' );
		$sanitized['chat_bg_mode'] = isset( $input['chat_bg_mode'] ) && in_array( $input['chat_bg_mode'], array( 'plugin_default', 'custom' ), true ) ? $input['chat_bg_mode'] : 'plugin_default';
		$sanitized['chat_bg_image_id'] = isset( $input['chat_bg_image_id'] ) ? absint( $input['chat_bg_image_id'] ) : 0;

		return $sanitized;
	}

	/**
	 * Section callbacks
	 */
	public function button_section_callback() {
		echo '<p>' . esc_html__( 'Configure the floating button appearance and behavior.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function chat_window_section_callback() {
		echo '<p>' . esc_html__( 'Configure the chat window that appears when clicking the button.', 'cideapps-wa-widget' ) . '</p>';
	}

	/**
	 * Field callbacks
	 */
	public function telephone_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['telephone'] ) ? $options['telephone'] : '';
		echo '<input type="text" name="cwaw_settings[telephone]" value="' . esc_attr( $value ) . '" class="regular-text" placeholder="1234567890" />';
		echo '<p class="description">' . esc_html__( 'Only digits. If empty, the widget will not be displayed.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function message_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['message'] ) ? $options['message'] : '';
		echo '<textarea name="cwaw_settings[message]" rows="3" class="large-text" placeholder="Hello! How can we help you?">' . esc_textarea( $value ) . '</textarea>';
		echo '<p class="description">' . esc_html__( 'Supports placeholders: {SITE}, {URL}, {TITLE}', 'cideapps-wa-widget' ) . '</p>';
	}

	public function image_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$image_id = isset( $options['image'] ) ? absint( $options['image'] ) : 0;
		$image_url = $image_id ? wp_get_attachment_image_url( $image_id, 'thumbnail' ) : '';

		echo '<div class="cwaw-image-upload">';
		echo '<input type="hidden" name="cwaw_settings[image]" id="cwaw_image_id" value="' . esc_attr( $image_id ) . '" />';
		echo '<div id="cwaw_image_preview">';
		if ( $image_url ) {
			echo '<img src="' . esc_url( $image_url ) . '" style="max-width: 150px; height: auto; display: block; margin-bottom: 10px;" />';
		}
		echo '</div>';
		echo '<button type="button" class="button cwaw-select-image" data-uploader-title="' . esc_attr__( 'Select Button Image', 'cideapps-wa-widget' ) . '">' . esc_html__( 'Select Image', 'cideapps-wa-widget' ) . '</button> ';
		echo '<button type="button" class="button cwaw-remove-image" ' . ( $image_id ? '' : 'style="display:none;"' ) . '>' . esc_html__( 'Remove Image', 'cideapps-wa-widget' ) . '</button>';
		echo '<p class="description">' . esc_html__( 'If no image is selected, the default WhatsApp icon will be used.', 'cideapps-wa-widget' ) . '</p>';
		echo '</div>';
	}

	public function tooltip_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['tooltip'] ) ? $options['tooltip'] : '';
		echo '<input type="text" name="cwaw_settings[tooltip]" value="' . esc_attr( $value ) . '" class="regular-text" placeholder="¿Necesitas ayuda?" />';
		echo '<p class="description">' . esc_html__( 'Text displayed next to the button.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function position_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['position'] ) ? $options['position'] : 'right';
		echo '<select name="cwaw_settings[position]">';
		echo '<option value="left" ' . selected( $value, 'left', false ) . '>' . esc_html__( 'Left', 'cideapps-wa-widget' ) . '</option>';
		echo '<option value="right" ' . selected( $value, 'right', false ) . '>' . esc_html__( 'Right', 'cideapps-wa-widget' ) . '</option>';
		echo '</select>';
	}

	public function button_delay_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['button_delay'] ) ? intval( $options['button_delay'] ) : 0;
		echo '<input type="number" name="cwaw_settings[button_delay]" value="' . esc_attr( $value ) . '" class="small-text" min="-1" step="1" />';
		echo '<p class="description">' . esc_html__( 'Seconds before showing the button. Use -1 to show immediately without animation.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function badge_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['badge'] ) ? $options['badge'] : '';
		echo '<input type="text" name="cwaw_settings[badge]" value="' . esc_attr( $value ) . '" class="small-text" placeholder="1" maxlength="3" />';
		echo '<p class="description">' . esc_html__( 'Optional badge text/number displayed on the button. Leave empty to hide.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function cta_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['cta'] ) ? $options['cta'] : '';
		echo '<textarea name="cwaw_settings[cta]" rows="3" class="large-text" placeholder="Hello! How can we help you?">' . esc_textarea( $value ) . '</textarea>';
		echo '<p class="description">' . esc_html__( 'Text displayed in the chat window bubble.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function button_text_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['button_text'] ) ? $options['button_text'] : __( 'Enviar', 'cideapps-wa-widget' );
		echo '<input type="text" name="cwaw_settings[button_text]" value="' . esc_attr( $value ) . '" class="regular-text" placeholder="' . esc_attr__( 'Enviar', 'cideapps-wa-widget' ) . '" />';
		echo '<p class="description">' . esc_html__( 'Text displayed on the send button in the chat window.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function theme_color_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['theme_color'] ) ? $options['theme_color'] : '#25d366';
		echo '<input type="text" name="cwaw_settings[theme_color]" value="' . esc_attr( $value ) . '" class="cwaw-color-picker" data-default-color="#25d366" />';
	}

	public function agent_name_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['agent_name'] ) ? $options['agent_name'] : __( 'Soporte', 'cideapps-wa-widget' );
		echo '<input type="text" name="cwaw_settings[agent_name]" value="' . esc_attr( $value ) . '" class="regular-text" />';
		echo '<p class="description">' . esc_html__( 'Name displayed in the chat header.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function agent_status_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['agent_status'] ) ? $options['agent_status'] : __( 'Online', 'cideapps-wa-widget' );
		echo '<input type="text" name="cwaw_settings[agent_status]" value="' . esc_attr( $value ) . '" class="regular-text" placeholder="' . esc_attr__( 'Online', 'cideapps-wa-widget' ) . '" />';
		echo '<p class="description">' . esc_html__( 'Status displayed below the agent name.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function agent_avatar_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$avatar_id = isset( $options['agent_avatar_id'] ) ? absint( $options['agent_avatar_id'] ) : 0;
		$avatar_url = $avatar_id ? wp_get_attachment_image_url( $avatar_id, 'thumbnail' ) : '';

		echo '<div class="cwaw-image-upload">';
		echo '<input type="hidden" name="cwaw_settings[agent_avatar_id]" id="cwaw_agent_avatar_id" value="' . esc_attr( $avatar_id ) . '" />';
		echo '<div id="cwaw_agent_avatar_preview">';
		if ( $avatar_url ) {
			echo '<img src="' . esc_url( $avatar_url ) . '" style="max-width: 80px; height: 80px; width: 80px; object-fit: cover; border-radius: 50%; display: block; margin-bottom: 10px; border: 2px solid #ddd;" />';
		}
		echo '</div>';
		echo '<button type="button" class="button cwaw-select-avatar" data-uploader-title="' . esc_attr__( 'Select Agent Avatar', 'cideapps-wa-widget' ) . '">' . esc_html__( 'Select Avatar', 'cideapps-wa-widget' ) . '</button> ';
		echo '<button type="button" class="button cwaw-remove-avatar" ' . ( $avatar_id ? '' : 'style="display:none;"' ) . '>' . esc_html__( 'Remove Avatar', 'cideapps-wa-widget' ) . '</button>';
		echo '<p class="description">' . esc_html__( 'Agent avatar displayed in the chat header. If empty, initials will be shown.', 'cideapps-wa-widget' ) . '</p>';
		echo '</div>';
	}

	public function chat_placeholder_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['chat_placeholder'] ) ? $options['chat_placeholder'] : __( 'Enter your message...', 'cideapps-wa-widget' );
		echo '<input type="text" name="cwaw_settings[chat_placeholder]" value="' . esc_attr( $value ) . '" class="regular-text" />';
		echo '<p class="description">' . esc_html__( 'Placeholder text in the message input field.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function chat_bg_mode_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$value = isset( $options['chat_bg_mode'] ) ? $options['chat_bg_mode'] : 'plugin_default';
		echo '<select name="cwaw_settings[chat_bg_mode]" id="cwaw_chat_bg_mode">';
		echo '<option value="plugin_default" ' . selected( $value, 'plugin_default', false ) . '>' . esc_html__( 'Plugin Default', 'cideapps-wa-widget' ) . '</option>';
		echo '<option value="custom" ' . selected( $value, 'custom', false ) . '>' . esc_html__( 'Custom Image', 'cideapps-wa-widget' ) . '</option>';
		echo '</select>';
		echo '<p class="description">' . esc_html__( 'Choose between default background or upload a custom image.', 'cideapps-wa-widget' ) . '</p>';
	}

	public function chat_bg_image_field_callback() {
		$options = get_option( 'cwaw_settings', array() );
		$bg_image_id = isset( $options['chat_bg_image_id'] ) ? absint( $options['chat_bg_image_id'] ) : 0;
		$bg_mode = isset( $options['chat_bg_mode'] ) ? $options['chat_bg_mode'] : 'plugin_default';
		$bg_image_url = $bg_image_id ? wp_get_attachment_image_url( $bg_image_id, 'full' ) : '';

		echo '<div class="cwaw-image-upload" id="cwaw_chat_bg_wrapper" style="' . ( $bg_mode === 'custom' ? '' : 'display:none;' ) . '">';
		echo '<input type="hidden" name="cwaw_settings[chat_bg_image_id]" id="cwaw_chat_bg_image_id" value="' . esc_attr( $bg_image_id ) . '" />';
		echo '<div id="cwaw_chat_bg_preview">';
		if ( $bg_image_url ) {
			echo '<img src="' . esc_url( $bg_image_url ) . '" style="max-width: 200px; height: auto; display: block; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;" />';
		}
		echo '</div>';
		echo '<button type="button" class="button cwaw-select-chat-bg" data-uploader-title="' . esc_attr__( 'Select Chat Background', 'cideapps-wa-widget' ) . '">' . esc_html__( 'Select Background', 'cideapps-wa-widget' ) . '</button> ';
		echo '<button type="button" class="button cwaw-remove-chat-bg" ' . ( $bg_image_id ? '' : 'style="display:none;"' ) . '>' . esc_html__( 'Remove Background', 'cideapps-wa-widget' ) . '</button>';
		echo '</div>';
	}

}
