// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';
import save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-input', {
	title: __( 'Input Field' ),
	description: __( 'An input field for the form.', 'sv_gutenform' ),
	icon,
	parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Input', 'sv_gutenform' ),
		__( 'Input', 'sv_gutenform' ),
		__( 'Field', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		// Input Settings
		defaultValue: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'text',
		},
		label: {
			type: 'string',
			default: __( 'Label', 'sv_gutenform' ),
		},
		placeholder: {
			type: 'string',
			default: __( 'Placeholder', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		disabled: {
			type: 'boolean',
			default: false,
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

		// Advanced
		className: {
			type: 'string',
		},
	},
	edit,
	save,
} );