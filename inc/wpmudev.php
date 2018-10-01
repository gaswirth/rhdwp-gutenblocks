<?php
/**
 * WPMUDEV Addons
 *
 * Addon functionality for WPMUDEV plugins.
 *
 * @package rhdwp
 */

/**                                                                                                                                                                                                
 * rhdwp_robots_mod function. Adds Sitemap (and any other desired data) to the virtual robots.txt. Uncomment add_filter to enable.                                                                   
 *                                                                                                                                                                                                 
 * @param string $output The pre-filtered robots.txt output                                                                                                                                        
 * @param bool $public Whether the site is considered "public"                                                                                                                                     
 **/                                                                                                                                                                                               
function rhdwp_robots_mod( $output, $public ) {                                                                                                                                                      
	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	
	// Only if Hummingbird is active.
	if ( is_plugin_active( 'wp-hummingbird/wp-hummingbird.php' ) ) {
		$output .= "\nSitemap: " . home_url( '/sitemap.xml' );                                                                                                                                     
		return $output;                                               
	}                                                                               
}                                                                                                                                                                                                  
add_filter( 'robots_txt', 'rhdwp_robots_mod', 10, 2 );