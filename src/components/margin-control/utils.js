export const MIN = -200;
export const MAX = 200;
export const RESET_VALUE = '';

export const MARGINS = {
	none: '0px',
	xs: '10px',
	sm: '15px',
	md: '20px',
	lg: '30px',
	xl: '60px',
	auto: 'auto',
};

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
