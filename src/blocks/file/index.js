// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-forms-file', {
	title: __( 'File', 'sv_forms' ),
	description: __( 'A field for file uploads.', 'sv_forms' ),
	icon,
	parent: [ 
		'straightvisions/sv-forms-form',
		'core/group',
		'core/column',
		'core/media-text',
		'core/cover'
	],
	category: 'straightvisions',
	keywords: [
		__( 'SV Forms File', 'sv_forms' ),
		__( 'File Input', 'sv_forms' ),
		__( 'Upload', 'sv_forms' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		inputId: {
			type: 'string',
		},

		// Input Settings
		name: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'file',
		},
		inputFontSize: {
			type: 'number',
		},

		// Label Settings
		label: {
			type: 'string',
		},
		labelFontSize: {
			type: 'number',
		},

		// Color Settings
		inputColor: {
			type: 'string',
		},
		inputColorClass: {
			type: 'string',
		},
		inputBackgroundColor: {
			type: 'string',
		},
		inputBackgroundColorClass: {
			type: 'string',
		},
		labelColor: {
			type: 'string',
		},
		labelColorClass: {
			type: 'string',
		},
		inputBorderColor: {
			type: 'string',
		},

		// Border Settings
		borderRadius: {
			type: 'number',	
			default: 0,
		},
		borderWidthTop: {
			type: 'number',
			default: 0,
		},
		borderWidthRight: {
			type: 'number',
			default: 0,
		},
		borderWidthBottom: {
			type: 'number',
			default: 0,
		},
		borderWidthLeft: {
			type: 'number',
			default: 0,
		},

		// Validation Settings
		required: {
			type: 'boolean',
		},

		// Advanced Settings
		autofocus: {
			type: 'boolean',
		},
		disabled: {
			type: 'boolean',
		},
		className: {
			type: 'string',
		},
	},
	edit,
	save: () => {
		return null;
	}
} );