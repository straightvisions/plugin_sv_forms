// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-email', {
	title: __( 'E-Mail', 'sv_gutenform' ),
	description: __( 'A field for an e-mail adress.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform E-Mail', 'sv_gutenform' ),
		__( 'E-Mail Input', 'sv_gutenform' ),
		__( 'E-Mail', 'sv_gutenform' ),
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
			default: __( 'E-Mail Label', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		placeholder: {
			type: 'string',
		},
		isRecipient: {
			type: 'boolean',
			default: false,
		},

		// Validation Settings
		required: {
			type: 'boolean',
			default: false,
		},
		minlength: {
			type: 'number',
			default: 0,
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

		// Advanced Settings
		autofocus: {
			type: 'boolean',
			default: false,
		},
		autocomplete: {
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