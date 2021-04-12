/**
 * Internal dependencies
 */
import { cleanEmptyObject } from '../../../utils/helpers';
import {
	MarginOptionControl,
	MarginMobileOptionControl,
} from '../../../components/margin-control/';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Inspector control panel containing the margin top related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin top edit element.
 */
function MarginTopEdit( props ) {
	const {
		attributes: { style, marginTop },
	} = props;

	const onChange = ( newMarginTopValue ) => {
		const newStyle = {
			...style,
			margin: {
				...style?.margin,
				marginTop: newMarginTopValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			marginTop: newMarginTopValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<MarginOptionControl
			label={ __( 'Margin top', 'gp-block-spacing' ) }
			value={ style?.margin?.marginTop }
			hasMarginNone={ marginTop !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the margin top mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin top edit element.
 */
function MarginTopMobileEdit( props ) {
	const {
		attributes: { marginTopMobile },
		setAttributes,
	} = props;

	const onChange = ( newMarginTopValue ) => {
		setAttributes( {
			marginTopMobile: newMarginTopValue,
		} );
	};

	return (
		<MarginMobileOptionControl
			label={ __( 'Margin top', 'gp-block-spacing' ) }
			value={ marginTopMobile }
			onChange={ onChange }
		/>
	);
}

export { MarginTopEdit, MarginTopMobileEdit };
