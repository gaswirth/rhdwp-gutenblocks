<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package rhdwp
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function rhdwp_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}
	
	return $classes;
};
add_filter( 'body_class', 'rhdwp_body_classes' );


/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function rhdwp_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'rhdwp_pingback_header' );


/**
 * Add a sidebar toggle link to the menu
 */
function rhdwp_menu_add_sidebar_toggle( $items, $args ) {
	if ( ! $args->theme_location == 'primary' )
		return $items;
	
	$items .= '
	<li class="menu-item manual-menu-item full-screen-toggle-item">
		<a class="full-screen-toggle">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M24 9h-2v-5h-7v-2h9v7zm-9 13v-2h7v-5h2v7h-9zm-15-7h2v5h7v2h-9v-7zm9-13v2h-7v5h-2v-7h9zm11 4h-16v12h16v-12z"/>
			</svg>
		</a>
	</li>
	';
	
	return $items;
}
add_filter( 'wp_nav_menu_items', 'rhdwp_menu_add_sidebar_toggle', 10, 2 );
