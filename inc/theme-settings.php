<?php
/**
 * RHDWP Theme Settings
 *
 * Creates the main RHDWP Theme Settings page. RHD modules and theme functions use this page to set options.
 */

$options['rhdwp_general_settings'] = get_option( 'rhdwp_general_settings' );
$options['rhdwp_appearance_settings'] = get_option( 'rhdwp_appearance_settings' );

/**
 * Add options submenu page.
 */
function rhdwp_admin_menu() {
	add_submenu_page( 'options-general.php', 'Roundhouse Designs Theme Admin', 'RHDWP', 'manage_options', 'rhdwp_settings', 'rhdwp_create_admin_page' );
}
add_action( 'admin_menu', 'rhdwp_admin_menu' );

/**
 * Submenu page callback.
 */
function rhdwp_create_admin_page() {
	?>
	<div class="wrap">
		<h2>Roundhouse Designs Theme Settings</h2>
		<form method="post" action="options.php">
			<?php
			// This prints out all hidden setting fields
			settings_fields( 'rhdwp_site_settings' );
			do_settings_sections( 'rhdwp-settings-admin' );
			submit_button();
			?>
		</form>
	</div>
	<?php
}

/**
 * Register and add settings.
 */
function rhdwp_theme_options_init() {
	register_setting( 'rhdwp_site_settings', 'rhdwp_general_settings', 'rhdwp_general_settings_sanitize' );
	register_setting( 'rhdwp_site_settings', 'rhdwp_appearance_settings', 'rhdwp_appearance_settings_sanitize' );

	add_settings_section(
		'rhdwp_general_settings',
		'Administration',
		'rhdwp_theme_admin_print_section_info',
		'rhdwp-settings-admin'
	);

	/**
	 * Administration Options
	 */
	add_settings_field(
		'rhdwp_theme_dev_mode',
		'Development Mode',
		'rhdwp_theme_dev_mode_cb',
		'rhdwp-settings-admin',
		'rhdwp_general_settings'
	);
}
add_action( 'admin_init', 'rhdwp_theme_options_init' );

/**
 * Sanitize each Administration setting field as needed.
 * 
 * @param array $input Contains all settings fields as array keys
 */
function rhdwp_general_settings_sanitize( $input ) {
	$new_input = array();

	$new_input['_theme_dev_mode'] = $input['_theme_dev_mode'];
	
	return $new_input;
}

/**
 * Print section info (optional).
 */
function rhdwp_theme_admin_print_section_info() {
	?>
	<p>Theme core options. <small>Probably best to leave this alone...</small></p>
	<?php
}

/**
 * Development Mode checkbox callback.
 * 
 * @param mixed $args
 */
function rhdwp_theme_dev_mode_cb( $args ) {
	global $options;
	?>
	<input type="checkbox" id="devmode" name="rhdwp_general_settings[_theme_dev_mode]" value="yes" <?php echo checked( 'yes', $options['rhdwp_general_settings']['_theme_dev_mode'], false ); ?>>
	<?php
}