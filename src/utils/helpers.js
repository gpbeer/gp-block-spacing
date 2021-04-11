/**
 * External dependencies
 */
import { identity, isEqual, isObject, mapValues, pickBy } from 'lodash';

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
 * Removed undefined values from nested object.
 *
 * @param {*} object
 * @return {*} Object cleaned from undefined values
 */
export function cleanEmptyObject( object ) {
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
}
