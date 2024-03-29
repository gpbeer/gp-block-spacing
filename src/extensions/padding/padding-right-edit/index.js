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
 * Inspector control panel containing the padding right related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding right edit element.
 */
function PaddingRightEdit( props ) {
	const {
		attributes: { style, paddingRight },
	} = props;

	const onChange = ( newPaddingRightValue ) => {
		const newStyle = {
			...style,
			padding: {
				...style?.padding,
				paddingRight: newPaddingRightValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			paddingRight: newPaddingRightValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<PaddingOptionControl
			label={ __( 'Padding right', 'gp-block-spacing' ) }
			value={ style?.padding?.paddingRight }
			hasPaddingNone={ paddingRight !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the padding right mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding right edit element.
 */
function PaddingRightMobileEdit( props ) {
	const {
		attributes: { paddingRightMobile },
		setAttributes,
	} = props;

	const onChange = ( newPaddingRightValue ) => {
		setAttributes( {
			paddingRightMobile: newPaddingRightValue,
		} );
	};

	return (
		<PaddingMobileOptionControl
			label={ __( 'Padding right', 'gp-block-spacing' ) }
			value={ paddingRightMobile }
			onChange={ onChange }
		/>
	);
}

export { PaddingRightEdit, PaddingRightMobileEdit };
