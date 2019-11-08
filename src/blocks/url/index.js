// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';
import save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-url', {
	title: __( 'URL', 'sv_gutenform' ),
	description: __( 'A field for a url.', 'sv_gutenform' ),
	icon,
	parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform URL', 'sv_gutenform' ),
		__( 'URL Input', 'sv_gutenform' ),
		__( 'URL', 'sv_gutenform' ),
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
			default: __( 'URL Label', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		placeholder: {
			type: 'string',
			default: __( 'URL', 'sv_gutenform' ),
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
		textColor: {
			type: 'string',
		},
		textColorClass: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		backgroundColorClass: {
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
	save,
} );