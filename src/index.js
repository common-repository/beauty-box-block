const { registerBlockType } = wp.blocks;
const { PanelBody, RangeControl, TextControl, SelectControl } = wp.components;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.blockEditor;

import attributes from './attributes';
import presets from './presets';
import getIcon from './icon';

const getStyles = ( {
	backgroundColor,
	skewX,
	skewY,
	topPosition,
	bottomPosition,
	leftPosition,
	rightPosition,
	width,
	radius,
} ) => {
	return {
		backgroundColor: backgroundColor,
		transform: `skew(${ skewX }deg, ${ skewY }deg)`,
		top: `${ topPosition }`,
		bottom: `${ bottomPosition }`,
		left: `${ leftPosition }`,
		right: `${ rightPosition }`,
		width: width,
		borderRadius: `${radius}px`
	};
};

const getOuterStyles = ( { padding, height, margin } ) => {
	return {
		padding,
		margin,
		height,
	};
};

registerBlockType( 'beauty-box/main-box', {
	title: 'Beauty Box',
	icon: getIcon(),
	category: 'common',
	attributes,
	edit: function( { className, attributes, setAttributes } ) {
		const options = Object.keys( presets ).map( ( p ) => {
			return { label: presets[ p ].label, value: presets[ p ].value };
		} );

		return (
			<div className={ className } style={ getOuterStyles( attributes ) }>
				<div
					className="beauty_block_inner_box"
					style={ getStyles( attributes ) }
				/>
				<div className="beauty_block_content_box">
					<InnerBlocks />
					<InspectorControls>
						<PanelBody title="Presets">
							<SelectControl
								label="Type"
								value={ attributes.preset }
								options={ options }
								onChange={ ( newValue ) =>
									setAttributes( {
										...attributes,
										...presets[ newValue ].css,
										preset: newValue,
									} )
								}
							/>
						</PanelBody>
						<PanelBody title="Background Color">
							<ColorPalette
								value={ attributes.backgroundColor }
								onChange={ ( newValue ) =>
									setAttributes( {
										backgroundColor: newValue,
									} )
								}
							/>
						</PanelBody>
						<PanelBody title="Values" initialOpen={ false }>
							<TextControl
								label="Width"
								value={ attributes.width }
								onChange={ ( newValue ) =>
									setAttributes( { width: newValue } )
								}
							/>
							<TextControl
								label="Height "
								value={ attributes.height }
								onChange={ ( newValue ) =>
									setAttributes( { height: newValue } )
								}
							/>
							<TextControl
								label="Padding"
								value={ attributes.padding }
								onChange={ ( newValue ) =>
									setAttributes( { padding: newValue } )
								}
							/>
							<TextControl
								label="Margin"
								value={ attributes.margin }
								onChange={ ( newValue ) =>
									setAttributes( { margin: newValue } )
								}
							/>
							<TextControl
								label="Top"
								value={ attributes.topPosition }
								onChange={ ( newValue ) =>
									setAttributes( { topPosition: newValue } )
								}
							/>
							<TextControl
								label="Bottom"
								value={ attributes.bottomPosition }
								onChange={ ( newValue ) =>
									setAttributes( {
										bottomPosition: newValue,
									} )
								}
							/>
							<TextControl
								label="Left"
								value={ attributes.leftPosition }
								onChange={ ( newValue ) =>
									setAttributes( { leftPosition: newValue } )
								}
							/>
							<TextControl
								label="Right"
								value={ attributes.rightPosition }
								onChange={ ( newValue ) =>
									setAttributes( { rightPosition: newValue } )
								}
							/>
							<RangeControl
								label="Border Radius"
								value={ attributes.radius }
								onChange={ ( newValue ) =>
									setAttributes( { radius: newValue } )
								}
								min={ 0 }
								max={ 100 }
							/>
							<RangeControl
								label="Skew X"
								value={ attributes.skewX }
								onChange={ ( newValue ) =>
									setAttributes( { skewX: newValue } )
								}
								min={ -89 }
								max={ 89 }
							/>
							<RangeControl
								label="Skew Y"
								value={ attributes.skewY }
								onChange={ ( newValue ) =>
									setAttributes( { skewY: newValue } )
								}
								min={ -89 }
								max={ 89 }
							/>
						</PanelBody>
					</InspectorControls>
				</div>
			</div>
		);
	},

	save: function( { attributes } ) {
		return (
			<div style={ getOuterStyles( attributes ) }>
				<div
					className="beauty_block_inner_box"
					style={ getStyles( attributes ) }
				/>
				<div className="beauty_block_content_box">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
