// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-forms-phone', {
	title: __( 'Phone', 'sv_forms' ),
	description: __( 'A field for phone numbers.', 'sv_forms' ),
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
		__( 'SV Forms Phone', 'sv_forms' ),
		__( 'Phone Input', 'sv_forms' ),
		__( 'Phone', 'sv_forms' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		inputId: {
			type: 'string',
		},
		
		// Input Settings
		defaultValue: {
			type: 'string',
		},
		label: {
			type: 'string',
		},
		name: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'tel',
		},
		placeholder: {
			type: 'string',
			default: '000 0000 0000',
		},

		// Validation Settings
		required: {
			type: 'boolean',
		},
		minlength: {
			type: 'number',
		},
		maxlength: {
			type: 'number',
		},

		// Color Settings
		labelColor: {
			type: 'string',
		},
		labelColorClass: {
			type: 'string',
		},
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
		inputBorderColor: {
			type: 'string',
			default: '#ddd',
		},

		// Border Settings
		borderRadius: {
			type: 'number',
			default: 0,
		},

		// Advanced Settings
		autofocus: {
			type: 'boolean',
		},
		autocomplete: {
			type: 'boolean',
		},
		readonly: {
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