/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { cleanEmptyObject } from '../../../utils/helpers';
import {
	PaddingOptionControl,
	PaddingMobileOptionControl,
} from '../../../components/padding-control/';

/**
 * Inspector control panel containing the padding left related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding left edit element.
 */
function PaddingLeftEdit( props ) {
	const {
		attributes: { style, paddingLeft },
	} = props;

	const onChange = ( newPaddingLeftValue ) => {
		const newStyle = {
			...style,
			padding: {
				...style?.padding,
				paddingLeft: newPaddingLeftValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			paddingLeft: newPaddingLeftValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<PaddingOptionControl
			label={ __( 'Padding left', 'gp-block-spacing' ) }
			value={ style?.padding?.paddingLeft }
			hasPaddingNone={ paddingLeft !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the padding left mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding left edit element.
 */
function PaddingLeftMobileEdit( props ) {
	const {
		attributes: { paddingLeftMobile },
		setAttributes,
	} = props;

	const onChange = ( newPaddingLeftValue ) => {
		setAttributes( {
			paddingLeftMobile: newPaddingLeftValue,
		} );
	};

	return (
		<PaddingMobileOptionControl
			label={ __( 'Padding left', 'gp-block-spacing' ) }
			value={ paddingLeftMobile }
			onChange={ onChange }
		/>
	);
}

export { PaddingLeftEdit, PaddingLeftMobileEdit };
