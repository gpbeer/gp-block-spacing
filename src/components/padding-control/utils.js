export const MIN = 0;
export const MAX = 200;
export const RESET_VALUE = '';

export const PADDINGS = {
	none: '0px',
	xs: '10px',
	sm: '15px',
	md: '20px',
	lg: '30px',
	xl: '60px',
};

/**
 * Determines if the paddingAttribute attribute has been properly defined.
 *
 * @param {any} paddingAttribute The value to check.
 *
 * @return {boolean} Whether the paddingAttribute attribute is valid.
 */
export function isPaddingDefined( paddingAttribute ) {
	return paddingAttribute !== undefined && paddingAttribute !== RESET_VALUE;
}
