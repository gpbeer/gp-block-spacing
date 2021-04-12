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
 * Inspector control panel containing the margin left related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin left edit element.
 */
function MarginLeftEdit( props ) {
	const {
		attributes: { style, marginLeft },
	} = props;

	const onChange = ( newMarginLeftValue ) => {
		const newStyle = {
			...style,
			margin: {
				...style?.margin,
				marginLeft: newMarginLeftValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			marginLeft: newMarginLeftValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<MarginOptionControl
			label={ __( 'Margin left', 'gp-block-spacing' ) }
			value={ style?.margin?.marginLeft }
			hasMarginNone={ marginLeft !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the margin left mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin left edit element.
 */
function MarginLeftMobileEdit( props ) {
	const {
		attributes: { marginLeftMobile },
		setAttributes,
	} = props;

	const onChange = ( newMarginLeftValue ) => {
		setAttributes( {
			marginLeftMobile: newMarginLeftValue,
		} );
	};

	return (
		<MarginMobileOptionControl
			label={ __( 'Margin left', 'gp-block-spacing' ) }
			value={ marginLeftMobile }
			onChange={ onChange }
		/>
	);
}

export { MarginLeftEdit, MarginLeftMobileEdit };
