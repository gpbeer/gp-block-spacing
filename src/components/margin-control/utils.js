import { applyFilters } from '@wordpress/hooks';

export const MIN = applyFilters( 'gp-block-spacing.margin-min', -200 );
export const MAX = applyFilters( 'gp-block-spacing.margin-max', 200 );
export const RESET_VALUE = '';

/**
 * @type {Object}
 */
export const MARGIN_MOBILE_OPTIONS = applyFilters(
	'gp-block-spacing.margin-options',
	{
		none: '0px',
		xs: '10px',
		sm: '15px',
		md: '20px',
		lg: '30px',
		xl: '60px',
		auto: 'auto',
	}
);

/**
 * Determines if the marginAttribute attribute has been properly defined.
 *
 * @param {any} marginAttribute The value to check.
 *
 * @return {boolean} Whether the marginAttribute attribute is valid.
 */
export function isMarginDefined( marginAttribute ) {
	return marginAttribute !== undefined && marginAttribute !== RESET_VALUE;
}
