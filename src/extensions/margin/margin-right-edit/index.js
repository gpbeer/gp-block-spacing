/**
 * Internal dependencies
 */
import { cleanEmptyObject } from '../utils';
import {
	MarginOptionControl,
	MarginMobileOptionControl,
} from '../../../components/margin-control/';
import { __ } from '@wordpress/i18n';

/**
 * Inspector control panel containing the margin right related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin right edit element.
 */
function MarginRightEdit( props ) {
	const {
		attributes: { style, marginRight },
	} = props;

	const onChange = ( newMarginRightValue ) => {
		const newStyle = {
			...style,
			margin: {
				...style?.margin,
				marginRight: newMarginRightValue,
			},
		};

		props.setAttributes( {
			style: cleanEmptyObject( newStyle ),
			marginRight: newMarginRightValue === 0 ? 'none' : undefined,
		} );
	};

	return (
		<MarginOptionControl
			label={ __( 'Margin right' ) }
			value={ style?.margin?.marginRight }
			hasMarginNone={ marginRight !== undefined }
			onChange={ onChange }
		/>
	);
}

/**
 * Inspector control panel containing the margin right mobile related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Margin right edit element.
 */
function MarginRightMobileEdit( props ) {
	const {
		attributes: { marginRightMobile },
		setAttributes,
	} = props;

	const onChange = ( newMarginRightValue ) => {
		setAttributes( {
			marginRightMobile: newMarginRightValue,
		} );
	};

	return (
		<MarginMobileOptionControl
			label={ __( 'Margin right' ) }
			value={ marginRightMobile }
			onChange={ onChange }
		/>
	);
}

export { MarginRightEdit, MarginRightMobileEdit };
