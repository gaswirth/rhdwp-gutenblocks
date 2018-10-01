/*
 * Test Block
 *
 * ROUNDHOUSE DESIGNS
 *
 * @package rhdwp
 */
 
var createElement = wp.element.createElement;
var __ = wp.i18n.__; // The __() function for internationalization
var Fragment = wp.element.Fragment;
var registerBlockType = wp.blocks.registerBlockType;
var RichText = wp.editor.RichText;
var BlockControls = wp.editor.BlockControls;
var AlignmentToolbar = wp.editor.AlignmentToolbar;

/**
 * Register block
 *
 * @param {string} name			Block name.
 * @param  {Object} settings 	Block settings.
 * @return {?WPBlock} 			Block itself, if registered successfully, otherwise "undefined".
 */
registerBlockType(
	'rhdwp/test-block',
	{
		title: __( 'Hello World (Step 4)' ),
		
		icon: 'universal-access-alt',
		
		category: 'layout',
		
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			alignment: {
				type: 'string',
			},
		},
		
		edit: function( props ) {
			var content = props.attributes.content;
			var alignment = props.attributes.alignment;
			
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}
			
			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}
			
			return (
				createElement(
					Fragment,
					null,
					createElement(
						BlockControls,
						null,
						createElement(
							AlignmentToolbar,
							{
								value: alignment,
								onChange: onChangeAlignment,
							}
						)
					),
					createElement(
						RichText,
						{
							key: 'editable',
							tagName: 'p',
							className: props.className,
							style: { textAlign: alignment },
							onChange: onChangeContent,
							value: content,
						}
					)
				)
			);
		},
		
		save: function( props ) {
			var content = props.attributes.content;
			var alignment = props.attributes.alignment;
			
			return createElement( RichText.Content, {
				tagName: 'p',
				className: props.className,
				style: { textAlign: alignment },
				value: content,
			} );
		},
	}
);