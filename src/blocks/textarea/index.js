// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-forms-textarea', {
	title: __( 'Textarea', 'sv_forms' ),
	description: __( 'A field for long messages.', 'sv_forms' ),
	icon,
	parent: [ 
		'straightvisions/sv-forms-form', 
		'core/group', 
		'core/cover',
		'core/column',
		'core/media-text',
	],
	category: 'straightvisions',
	keywords: [
		__( 'SV Forms Textarea', 'sv_forms' ),
		__( 'Textarea Input', 'sv_forms' ),
		__( 'Textarea', 'sv_forms' ),
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
			default: 'textarea',
		},
		placeholder: {
			type: 'string',
			default: __( 'Message', 'sv_forms' ),
		},

		// Validation Settings
		required: {
			type: 'boolean',
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

		// Border Settings
		borderRadius: {
			type: 'number'	
		},

		// Advanced Settings
		autofocus: {
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