/**
 * Internal dependencies
 */
import { cleanEmptyObject } from '../utils';
import {
	PaddingOptionControl,
	PaddingMobileOptionControl,
} from '../../../components/padding-control/';
import { __ } from '@wordpress/i18n';

/**
 * Inspector control panel containing the padding bottom related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding bottom edit element.
 */
function PaddingBottomEdit( props ) {
	const {
		attributes: { style, paddingBottom },
	} = props;

	const onChange = ( newPaddingBottomValue ) => {
		const newStyle = {
			...style,
			padding: {
				...style?.padding,
				paddingBottom: newPaddingBottomValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			paddingBottom: newPaddingBottomValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<PaddingOptionControl
			label={ __( 'Padding bottom' ) }
			value={ style?.padding?.paddingBottom }
			hasPaddingNone={ paddingBottom !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the padding bottom mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding bottom edit element.
 */
function PaddingBottomMobileEdit( props ) {
	const {
		attributes: { paddingBottomMobile },
		setAttributes,
	} = props;

	const onChange = ( newPaddingBottomValue ) => {
		setAttributes( {
			paddingBottomMobile: newPaddingBottomValue,
		} );
	};

	return (
		<PaddingMobileOptionControl
			label={ __( 'Padding bottom' ) }
			value={ paddingBottomMobile }
			onChange={ onChange }
		/>
	);
}

export { PaddingBottomEdit, PaddingBottomMobileEdit };
