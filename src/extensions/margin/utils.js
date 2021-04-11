/**
 * External dependencies
 */
import {
	identity,
	isEqual,
	isObject,
	kebabCase,
	mapValues,
	pickBy,
	get,
	has,
} from 'lodash';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

import { CLASS_ATTRIBUTE, STYLE_PROPERTY } from './index';

/**
 * Removed undefined values from nested object.
 *
 * @param {*} object
 * @return {*} Object cleaned from undefined values
 */
export const cleanEmptyObject = ( object ) => {
	if ( ! isObject( object ) ) {
		return object;
	}
	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		identity
	);
	return isEqual( cleanedNestedObjects, {} )
		? undefined
		: cleanedNestedObjects;
};

/**
 * Check if given block is allowed.
 *
 * @param {string} blockName the block name.
 * @return {boolean} true or false.
 */
export function isAllowedBlock( blockName ) {
	const allowedBlocks = applyFilters( 'gp-block-spacing.allowed-blocks-margin', [
		'core/buttons',
		'core/button',
		'core/columns',
		'core/column',
		'core/file',
		'core/group',
		'core/heading',
		'core/list',
		'core/image',
		'core/paragraph',
		'core/pullquote',
		'core/quote',
		'core/separator',
	] );

	return allowedBlocks.includes( blockName );
}

/**
 * Returns a class based on marginName.
 *
 * @example .has-margin-top--xs-mobile {}
 * @param {string} marginSlug    Slug of the margin.
 *
 * @param {string} orientation top, right, bottom, left.
 * @param {string} breakPoint tablet, mobile or desktop.
 * @return {string} String with the class corresponding to the margin passed.
 */
export function getMarginClass( marginSlug, orientation, breakPoint ) {
	if ( ! marginSlug ) {
		return;
	}

	if ( breakPoint ) {
		return `has-margin-${ orientation }--${ kebabCase(
			marginSlug
		) }-${ breakPoint }`;
	}

	return `has-margin-${ orientation }--${ kebabCase( marginSlug ) }`;
}

/**
 * For removing hole, and, falsy (null, undefined, 0, -0, NaN, "", false, document.all) values:
 *
 * @param {Array} array
 * @return {*} The clean array
 */
export function removeNull( array ) {
	return array.filter( ( x ) => x );
}

/**
 * Returns the inline styles to add depending on the style object
 *
 * @param  {Object} styles Styles configuration
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
 * Margin classes
 *
 * @param  {Object} attributes The attributes
 * @return {Array}  Css classes
 */
export function getMarginClasses( attributes ) {
	const output = [];

	Object.entries( CLASS_ATTRIBUTE ).forEach(
		( [ attribute, ...otherObjectKeys ] ) => {
			const [ objectKeys ] = otherObjectKeys;
			if ( has( attributes, attribute ) ) {
				output.push(
					getMarginClass(
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
 * Assign the marginMobile attributes to blocks.
 *
 * @param  {Object} attributes The attributes
 */
export function setMarginAttributes( attributes ) {
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
