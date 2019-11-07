// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';
import save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-text', {
	title: __( 'Text', 'sv_gutenform' ),
	description: __( 'A field for short texts.', 'sv_gutenform' ),
	icon,
	parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Text', 'sv_gutenform' ),
		__( 'Text Input', 'sv_gutenform' ),
		__( 'Text', 'sv_gutenform' ),
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
		placeholder: {
			type: 'string',
			default: __( 'Text', 'sv_gutenform' ),
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