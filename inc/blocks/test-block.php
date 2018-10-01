<?php
/**
 * rhdwp Gutenberg Blocks
 *
 * @package rhdwp
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function rhdwp_test_block() {
    wp_register_script(
    	'rhdwp-test-block-editor',
    	get_theme_file_uri( '/assets/js/blocks/test-block.js' ),
    	array( 'wp-blocks', 'wp-element' )
    );
    
    wp_register_style(
		'rhdwp-test-block-editor',
		get_theme_file_uri( '/assets/css/blocks/test-block-editor.css' ),
		array( 'wp-edit-blocks' ),
		filemtime( get_theme_file_uri( '/assets/css/blocks/test-block-editor.css' ) )
    );
    
    wp_register_style(
		'rhdwp-test-block',
		get_theme_file_uri( '/assets/css/blocks/test-block.css' ),
		array(),
		filemtime( get_theme_file_uri( '/assets/css/blocks/test-block.css' ) )
    );

    register_block_type( 'rhdwp/test-block', array(
        'editor_script'	=> 'rhdwp-test-block-editor',
        'editor_style'	=> 'rhdwp-test-block-editor',
        'style'			=> 'rhdwp-test-block'
    ) );
}
add_action( 'init', 'rhdwp_test_block' );