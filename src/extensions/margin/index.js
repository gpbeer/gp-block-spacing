/**
 * Internal dependencies
 */
import icons from '../../utils/icons';

import {
	getInlineStyles,
	getMarginClasses,
	isAllowedBlock,
	setMarginAttributes,
} from './utils';
import { removeNull } from '../../utils/helpers';
import { MarginBottomEdit, MarginBottomMobileEdit } from './margin-bottom-edit';
import { MarginLeftEdit, MarginLeftMobileEdit } from './margin-left-edit';
import { MarginRightEdit, MarginRightMobileEdit } from './margin-right-edit';
import { MarginTopEdit, MarginTopMobileEdit } from './margin-top-edit';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, TabPanel } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import TokenList from '@wordpress/token-list';

export const STYLE_PROPERTY = {
	marginBottom: [ 'margin', 'marginBottom' ],
	marginLeft: [ 'margin', 'marginLeft' ],
	marginRight: [ 'margin', 'marginRight' ],
	marginTop: [ 'margin', 'marginTop' ],
};

export const CLASS_ATTRIBUTE = {
	marginBottom: [ 'bottom' ],
	marginBottomMobile: [ 'bottom', 'mobile' ],
	marginLeft: [ 'left' ],
	marginLeftMobile: [ 'left', 'mobile' ],
	marginRight: [ 'right' ],
	marginRightMobile: [ 'right', 'mobile' ],
	marginTop: [ 'top' ],
	marginTopMobile: [ 'top', 'mobile' ],
};

/**
 * Filters registered block settings, extending attributes to include `style` attribute.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */
function addAttributes( settings ) {
	if ( ! isAllowedBlock( settings.name ) ) {
		return settings;
	}

	// Allow blocks to specify their own attribute definition with default values if needed.
	if ( ! settings.attributes.style ) {
		Object.assign( settings.attributes, {
			style: {
				type: 'object',
			},
		} );
	}

	setMarginAttributes( settings.attributes );

	return settings;
}

/**
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param  {Object} props      Additional props applied to save element
 * @param  {Object} blockType  Block type
 * @param  {Object} attributes Block attributes
 * @return {Object}            Filtered props applied to save element
 */
export function addSaveProps( props, blockType, attributes ) {
	if ( ! isAllowedBlock( blockType.name ) ) {
		return props;
	}

	// For inline style.
	const { style } = attributes;

	props.style = {
		...getInlineStyles( style ),
		...props.style,
	};

	// Spacing based on css class to avoid media query inline style in code.
	const classes = new TokenList( props.className );
	const spacingClasses = removeNull( getMarginClasses( attributes ) );

	classes.add( spacingClasses.join( ' ' ) );

	const newClassName = classes.value;

	props.className = newClassName ? newClassName : undefined;

	return props;
}

/**
 * Filters registered block settings to extand the block edit wrapper
 * to apply the desired styles and classnames properly.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */
export function addEditProps( settings ) {
	if ( ! isAllowedBlock( settings.name ) ) {
		return settings;
	}

	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}

		return addSaveProps( props, settings, attributes );
	};

	return settings;
}

/**
 * Override the default edit UI to include new inspector controls for
 * all the custom styles configs.
 *
 * @param  {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */

export const withBlockControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( isAllowedBlock( props.name ) && props.isSelected ) {
			return (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody
							title={ __( 'Margin', 'gp-block-spacing' ) }
							initialOpen={ false }
						>
							<TabPanel
								initialTabName="default"
								tabs={ [
									{
										name: 'default',
										title: icons.desktop,
										className: 'tab-default',
									},
									{
										name: 'mobile',
										title: icons.mobile,
										className: 'tab-mobile',
									},
								] }
							>
								{ ( tab ) => {
									if ( 'mobile' === tab.name ) {
										return (
											<>
												<MarginTopMobileEdit
													{ ...props }
												/>
												<MarginBottomMobileEdit
													{ ...props }
												/>
												<MarginLeftMobileEdit
													{ ...props }
												/>
												<MarginRightMobileEdit
													{ ...props }
												/>
											</>
										);
									}

									return (
										<>
											<MarginTopEdit { ...props } />
											<MarginBottomEdit { ...props } />
											<MarginLeftEdit { ...props } />
											<MarginRightEdit { ...props } />
										</>
									);
								} }
							</TabPanel>
						</PanelBody>
					</InspectorControls>
				</>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withToolbarControls' );

addFilter(
	'blocks.registerBlockType',
	'gp-block-spacing/margin/addAttributes',
	addAttributes
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'gp-block-spacing/margin/addSaveProps',
	addSaveProps
);

addFilter(
	'blocks.registerBlockType',
	'gp-block-spacing/margin/addEditProps',
	addEditProps
);

addFilter(
	'editor.BlockEdit',
	'gp-block-spacing/margin/with-block-controls',
	withBlockControls
);
