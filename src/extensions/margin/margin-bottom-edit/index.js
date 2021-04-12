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
 * Inspector control panel containing the margin bottom related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin bottom edit element.
 */
function MarginBottomEdit( props ) {
	const {
		attributes: { style, marginBottom },
	} = props;

	const onChange = ( newMarginBottomValue ) => {
		const newStyle = {
			...style,
			margin: {
				...style?.margin,
				marginBottom: newMarginBottomValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			marginBottom: newMarginBottomValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<MarginOptionControl
			label={ __( 'Margin bottom', 'gp-block-spacing' ) }
			value={ style?.margin?.marginBottom }
			hasMarginNone={ marginBottom !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the margin bottom mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin bottom edit element.
 */
function MarginBottomMobileEdit( props ) {
	const {
		attributes: { marginBottomMobile },
		setAttributes,
	} = props;

	const onChange = ( newMarginBottomValue ) => {
		setAttributes( {
			marginBottomMobile: newMarginBottomValue,
		} );
	};

	return (
		<MarginMobileOptionControl
			label={ __( 'Margin bottom', 'gp-block-spacing' ) }
			value={ marginBottomMobile }
			onChange={ onChange }
		/>
	);
}

export { MarginBottomEdit, MarginBottomMobileEdit };
