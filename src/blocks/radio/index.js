// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';
import save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-radio', {
	title: __( 'Radio', 'sv_gutenform' ),
	description: __( 'A radio button for an option to select.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Radio', 'sv_gutenform' ),
		__( 'Radio Button', 'sv_gutenform' ),
		__( 'Radio', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center' ],
	},
	attributes: {
		// Input Settings
		isChecked: {
			type: 'boolean',
			default: false,
		},
		value: {
			type: 'string',
		},
		label: {
			type: 'string',
			default: __( 'Text Label', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		disabled: {
			type: 'boolean',
			default: false,
		},

		// Advanced
		className: {
			type: 'string',
		},
	},
	edit,
	save,
} );