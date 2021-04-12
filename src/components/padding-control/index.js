/**
 * Internal dependencies
 */
import { isPaddingDefined, MAX, MIN, PADDINGS, RESET_VALUE } from './utils';

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

function PaddingOptionControl( {
	value: currentValue,
	onChange,
	hasPaddingNone,
	label,
} ) {
	const isDefined = isPaddingDefined( currentValue );

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
				checked={ !! hasPaddingNone }
				onChange={ handleToggleOnChange }
			/>
		</div>
	);
}

function PaddingMobileOptionControl( {
	value: currentValue,
	onChange,
	label,
} ) {
	// Default spacing.
	const spacing = [ { value: '', label: 'Default' } ];

	Object.entries( PADDINGS ).forEach( ( [ key, value ] ) => {
		spacing.push( { value: key, label: value } );
	} );

	const handleOnChange = ( value ) => {
		onChange( value );
	};

	const value = isPaddingDefined( currentValue ) ? currentValue : RESET_VALUE;

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

export { PaddingOptionControl, PaddingMobileOptionControl };
