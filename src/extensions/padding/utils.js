/**
 * External dependencies
 */
import { kebabCase, get, has } from 'lodash';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { hasBlockSupport } from '@wordpress/blocks';
import { CLASS_ATTRIBUTE, STYLE_PROPERTY } from './index';

export const PADDING_SUPPORT_KEY = 'padding';

/**
 * Check if given block is allowed.
 *
 * @param {string} blockName the block name.
 * @param {Object} blockType the type object.
 *
 * @return {boolean} true or false.
 */
export function isAllowedBlock( blockName, blockType = false ) {
	const allowedBlocks = applyFilters(
		'gp-block-spacing.allowed-blocks-padding',
		[
			'core/buttons',
			'core/button',
			'core/cover',
			'core/columns',
			'core/column',
			'core/file',
			'core/group',
			'core/heading',
			'core/list',
			'core/paragraph',
			'core/pullquote',
			'core/quote',
			'core/separator',
		]
	);

	return (
		allowedBlocks.includes( blockName ) ||
		hasBlockSupport( blockType || blockName, PADDING_SUPPORT_KEY )
	);
}

/**
 * Returns a class based on paddingName.
 *
 * @example .has-padding-top--xs-mobile {}
 * @param {string} paddingSlug Slug of the padding.
 *
 * @param {string} orientation top, right, bottom, left.
 * @param {string} breakPoint  tablet, mobile or desktop.
 * @return {string} String with the class corresponding to the padding passed.
 */
export function getPaddingClass( paddingSlug, orientation, breakPoint ) {
	if ( ! paddingSlug ) {
		return;
	}

	if ( breakPoint ) {
		return `has-padding-${ orientation }--${ kebabCase(
			paddingSlug
		) }-${ breakPoint }`;
	}

	return `has-padding-${ orientation }--${ kebabCase( paddingSlug ) }`;
}

/**
 * Returns the inline styles to add depending on the style object
 *
 * @param {Object} styles Styles configuration
 * @return {Object}        Flattened CSS variables declaration
 */
export function getInlineStyles( styles = {} ) {
	const output = {};
	Object.entries( STYLE_PROPERTY ).forEach(
		( [ styleKey, ...otherObjectKeys ] ) => {
			const [ objectKeys ] = otherObjectKeys;

			if ( has( styles, objectKeys ) ) {
				output[ styleKey ] = get( styles, objectKeys );
			}
		}
	);

	return output;
}

/**
 * Padding classes
 *
 * @param {Object} attributes The attributes
 * @return {Array}  Css classes
 */
export function getPaddingClasses( attributes ) {
	const output = [];

	Object.entries( CLASS_ATTRIBUTE ).forEach(
		( [ attribute, ...otherObjectKeys ] ) => {
			const [ objectKeys ] = otherObjectKeys;
			if ( has( attributes, attribute ) ) {
				output.push(
					getPaddingClass(
						attributes[ attribute ],
						objectKeys[ 0 ],
						objectKeys[ 1 ]
					)
				);
			}
		}
	);

	return output;
}

/**
 * Assign the paddingMobile attributes to blocks.
 *
 * @param {Object} attributes The attributes
 */
export function setPaddingAttributes( attributes ) {
	Object.entries( CLASS_ATTRIBUTE ).forEach( ( [ attribute ] ) => {
		// Allow blocks to specify their own attribute definition with default values if needed.
		if ( ! has( attributes, attribute ) ) {
			return Object.assign( attributes, {
				[ attribute ]: {
					type: 'string',
				},
			} );
		}
	} );
}
