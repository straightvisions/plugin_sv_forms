// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';
import save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-checkbox', {
	title: __( 'Checkbox', 'sv_gutenform' ),
	description: __( 'A checkbox for an option to select.', 'sv_gutenform' ),
	icon,
	parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Checkbox', 'sv_gutenform' ),
		__( 'Checkbox Input', 'sv_gutenform' ),
		__( 'Checkbox', 'sv_gutenform' ),
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