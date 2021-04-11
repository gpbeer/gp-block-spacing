import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { cleanEmptyObject } from '../utils';
import {
	PaddingOptionControl,
	PaddingMobileOptionControl,
} from '../../../components/padding-control/';

/**
 * Inspector control panel containing the padding top related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding top edit element.
 */
function PaddingTopEdit( props ) {
	const {
		attributes: { style, paddingTop },
	} = props;

	const onChange = ( newPaddingTopValue ) => {
		const newStyle = {
			...style,
			padding: {
				...style?.padding,
				paddingTop: newPaddingTopValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			paddingTop: newPaddingTopValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<PaddingOptionControl
			label={ __( 'Padding top' ) }
			value={ style?.padding?.paddingTop }
			hasPaddingNone={ paddingTop !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the padding top mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Padding top edit element.
 */
function PaddingTopMobileEdit( props ) {
	const {
		attributes: { paddingTopMobile },
		setAttributes,
	} = props;

	const onChange = ( newPaddingTopValue ) => {
		setAttributes( {
			paddingTopMobile: newPaddingTopValue,
		} );
	};

	return (
		<PaddingMobileOptionControl
			label={ __( 'Padding top' ) }
			value={ paddingTopMobile }
			onChange={ onChange }
		/>
	);
}

export { PaddingTopEdit, PaddingTopMobileEdit };
