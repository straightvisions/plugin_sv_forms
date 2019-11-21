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
	//parent: ['straightvisions/sv-gutenform'],
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
		placeholder: {
			type: 'string',
		},

		// Validation Settings
		required: {
			type: 'boolean',
			default: false,
		},
		maxlength: {
			type: 'number',
			default: 0,
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

		// Advanced Settings
		autofocus: {
			type: 'boolean',
			default: false,
		},
		readonly: {
			type: 'boolean',
			default: false,
		},
		disabled: {
			type: 'boolean',
			default: false,
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