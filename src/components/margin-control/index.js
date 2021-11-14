/**
 * Internal dependencies
 */
import {
	isMarginDefined,
	MIN,
	MAX,
	RESET_VALUE,
	MARGIN_MOBILE_OPTIONS,
} from './utils';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Styles dependencies
 */
import './style.scss';

function MarginOptionControl( {
	value: currentValue,
	onChange,
	hasMarginNone,
	label,
} ) {
	const isDefined = isMarginDefined( currentValue );

	const handleOnChange = ( nextValue ) => {
		onChange( nextValue );
	};

	const handleToggleOnChange = ( checked ) => {
		// todo: Sync RangeControl
		return checked ? handleOnChange( 0 ) : handleOnChange( undefined );
	};

	const value = isDefined ? currentValue : RESET_VALUE;

	return (
		<div className="gp-block-spacing-block-editor-control">
			<RangeControl
				label={ label }
				value={ parseFloat( value ) || undefined }
				onChange={ handleOnChange }
				min={ MIN }
				max={ MAX }
				initialPosition={ RESET_VALUE }
				resetFallbackValue={ RESET_VALUE }
				allowReset
			/>

			<ToggleControl
				label={ __( 'None', 'gp-block-spacing' ) }
				checked={ !! hasMarginNone }
				onChange={ handleToggleOnChange }
			/>
		</div>
	);
}

function MarginMobileOptionControl( { value: currentValue, onChange, label } ) {
	const isDefined = isMarginDefined( currentValue );

	// Default spacing.
	const spacing = [ { value: '', label: 'Default' } ];

	Object.entries( MARGIN_MOBILE_OPTIONS ).forEach( ( [ key, value ] ) => {
		spacing.push( { value: key, label: value } );
	} );

	const handleOnChange = ( value ) => {
		onChange( value );
	};

	const value = isDefined ? currentValue : RESET_VALUE;

	return (
		<div className="gp-block-spacing-block-editor-control">
			<SelectControl
				label={ label }
				value={ value || undefined }
				options={ spacing }
				onChange={ handleOnChange }
			/>
		</div>
	);
}

export { MarginOptionControl, MarginMobileOptionControl };
