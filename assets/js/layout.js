/*
 * Theme JS
 *
 * ROUNDHOUSE DESIGNS
 *
 * @package rhdwp
 */

// jQuery noConflict
(function($){
	'use strict';
	
	$(document).ready(function(){
		$(window).on('resize', resizeHandlers);
		$(window).on('scroll', scrollHandlers);
		
		// Click handlers
		fullscreenToggle();

		// Layout
		removeFullscreenToggle();
	});


	/**
	 * scrollHandlers function. Actions to perform while scrolling.
	 * 
	 * @returns {void}
	 */
	function scrollHandlers() {
		// ...
	}


	/**
	 * resizeHandlers function. Actions to perform while resizing.
	 * 
	 * @returns {void}
	 */
	function resizeHandlers() {
		// ...
	}
	
	
	/**
	 * sidebarCheck function. Determines if sidebar element is present on the page.
	 *
	 * @returns {boolean}
	 */
	function sidebarCheck() {
		if ( $('#secondary').length )
			return true;
		else
			return false;
	}
	
	
	/**
	 * removeSidebarTottle function. Removes the full screen toggle button
	 *
	 * @returns {boolean}
	 */
	function removeFullscreenToggle() {
		if ( sidebarCheck() === true )
			return;
		
		$('#content').addClass('full-width');
		$('.full-screen-toggle').remove();
	}
	
	
	/**
	 * fullscreenToggle function. It toggles full screen mode, Jim.
	 *
	 * @returns {void}
	 */
	function fullscreenToggle() {
		$('.full-screen-toggle').click(function(e){
			e.preventDefault();
			
			$('.full-screen-toggle').toggleClass('full-screen-active');		
			$('.site-content').toggleClass('full-width');
			$('#primary').toggleClass('full-width');
			$('#secondary').toggleClass('full-width');
		});
	}
})(jQuery);