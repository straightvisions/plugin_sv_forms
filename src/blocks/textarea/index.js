// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-textarea', {
	title: __( 'Textarea', 'sv_gutenform' ),
	description: __( 'A field for long messages.', 'sv_gutenform' ),
	icon,
	parent: [ 
		'straightvisions/sv-gutenform-form', 
		'core/group', 
		'core/cover',
		'core/column',
		'core/media-text',
	],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Textarea', 'sv_gutenform' ),
		__( 'Textarea Input', 'sv_gutenform' ),
		__( 'Textarea', 'sv_gutenform' ),
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
			default: __( 'Text Label', 'sv_gutenform' ),
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
		textareaColor: {
			type: 'string',
		},
		textareaColorClass: {
			type: 'string',
		},
		textareaBackgroundColor: {
			type: 'string',
		},
		textareaBackgroundColorClass: {
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