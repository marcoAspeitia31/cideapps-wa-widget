<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://cideapps.com
 * @since      1.0.0
 *
 * @package    Cideapps_Wa_Widget
 * @subpackage Cideapps_Wa_Widget/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Cideapps_Wa_Widget
 * @subpackage Cideapps_Wa_Widget/public
 * @author     CIDEAPPS <marco.aspeitia@cideapps.com>
 */
class Cideapps_Wa_Widget_Public {

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		$settings = get_option( 'cwaw_settings', array() );
		
		// Solo cargar si hay teléfono configurado
		if ( empty( $settings['telephone'] ) ) {
			return;
		}

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/cideapps-wa-widget-public.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		$settings = get_option( 'cwaw_settings', array() );
		
		// Solo cargar si hay teléfono configurado
		if ( empty( $settings['telephone'] ) ) {
			return;
		}

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/cideapps-wa-widget-public.js', array(), $this->version, true );

		// Obtener URL actual de forma segura
		global $wp;
		$current_url = home_url( add_query_arg( array(), $wp->request ) );
		if ( empty( $wp->request ) && isset( $_SERVER['REQUEST_URI'] ) ) {
			$current_url = home_url( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
		}

		// Localizar script con configuraciones
		wp_localize_script( $this->plugin_name, 'cwawSettings', array(
			'telephone' => isset( $settings['telephone'] ) ? $settings['telephone'] : '',
			'message' => isset( $settings['message'] ) ? $settings['message'] : '',
			'image' => isset( $settings['image'] ) ? $settings['image'] : 0,
			'imageUrl' => isset( $settings['image'] ) && $settings['image'] > 0 ? wp_get_attachment_image_url( $settings['image'], 'full' ) : '',
			'tooltip' => isset( $settings['tooltip'] ) ? $settings['tooltip'] : '',
			'badge' => isset( $settings['badge'] ) ? $settings['badge'] : '',
			'position' => isset( $settings['position'] ) ? $settings['position'] : 'right',
			'buttonDelay' => isset( $settings['button_delay'] ) ? intval( $settings['button_delay'] ) : 0,
			'cta' => isset( $settings['cta'] ) ? $settings['cta'] : '',
			'buttonText' => isset( $settings['button_text'] ) ? $settings['button_text'] : __( 'Enviar', 'cideapps-wa-widget' ),
			'themeColor' => isset( $settings['theme_color'] ) ? $settings['theme_color'] : '#25d366',
			'siteName' => get_bloginfo( 'name' ),
			'currentUrl' => esc_url_raw( $current_url ),
			'currentTitle' => wp_get_document_title(),
		) );
	}

	/**
	 * Render the WhatsApp widget in the footer.
	 *
	 * @since    1.0.0
	 */
	public function render_widget() {
		$settings = get_option( 'cwaw_settings', array() );
		
		// No renderizar si no hay teléfono
		if ( empty( $settings['telephone'] ) ) {
			return;
		}

		$telephone = $settings['telephone'];
		$tooltip = isset( $settings['tooltip'] ) ? $settings['tooltip'] : '';
		$badge = isset( $settings['badge'] ) ? $settings['badge'] : '';
		$position = isset( $settings['position'] ) ? esc_attr( $settings['position'] ) : 'right';
		$cta = isset( $settings['cta'] ) ? $settings['cta'] : '';
		$button_text = isset( $settings['button_text'] ) ? esc_html( $settings['button_text'] ) : __( 'Enviar', 'cideapps-wa-widget' );
		$default_message = isset( $settings['message'] ) ? esc_attr( $settings['message'] ) : '';
		$theme_color = isset( $settings['theme_color'] ) ? esc_attr( $settings['theme_color'] ) : '#25d366';
		$image_id = isset( $settings['image'] ) ? absint( $settings['image'] ) : 0;
		$image_url = $image_id > 0 ? wp_get_attachment_image_url( $image_id, 'full' ) : '';

		?>
		<div id="cwaw-widget" class="cwaw-widget cwaw-position-<?php echo esc_attr( $position ); ?>" style="--cwaw-theme-color: <?php echo esc_attr( $theme_color ); ?>;">
			<div class="cwaw-button-wrapper">
				<?php if ( ! empty( $tooltip ) ) : ?>
					<div class="cwaw-tooltip"><?php echo esc_html( $tooltip ); ?></div>
				<?php endif; ?>
				<button id="cwaw-button" class="cwaw-button" aria-label="<?php esc_attr_e( 'Open WhatsApp chat', 'cideapps-wa-widget' ); ?>">
					<?php if ( $image_url ) : ?>
						<img src="<?php echo esc_url( $image_url ); ?>" alt="WhatsApp" />
					<?php else : ?>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
							<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 339.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56 81.2 56 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
						</svg>
					<?php endif; ?>
					<?php if ( ! empty( $badge ) ) : ?>
						<span class="cwaw-badge"><?php echo esc_html( $badge ); ?></span>
					<?php endif; ?>
				</button>
			</div>
			<div id="cwaw-chat-window" class="cwaw-chat-window">
				<div class="cwaw-chat-header">
					<div class="cwaw-chat-header-content">
						<strong><?php esc_html_e( 'WhatsApp', 'cideapps-wa-widget' ); ?></strong>
						<button id="cwaw-close" class="cwaw-close" aria-label="<?php esc_attr_e( 'Close chat', 'cideapps-wa-widget' ); ?>">×</button>
					</div>
				</div>
				<div class="cwaw-chat-body">
					<?php if ( ! empty( $cta ) ) : ?>
						<div class="cwaw-chat-message"><?php echo wp_kses_post( $cta ); ?></div>
					<?php endif; ?>
					<div class="cwaw-chat-input-wrapper">
						<textarea 
							id="cwaw-message-input" 
							class="cwaw-message-input" 
							placeholder="<?php esc_attr_e( 'Escribe tu mensaje...', 'cideapps-wa-widget' ); ?>"
							rows="3"
							data-default-message="<?php echo esc_attr( $default_message ); ?>"
						></textarea>
						<button id="cwaw-send-button" class="cwaw-whatsapp-button" type="button">
							<?php echo esc_html( $button_text ); ?>
						</button>
					</div>
				</div>
			</div>
		</div>
		<?php
	}

}
