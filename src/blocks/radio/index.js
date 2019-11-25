// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType }	= wp.blocks;

registerBlockType( 'straightvisions/sv-gutenform-radio', {
	title: __( 'Radio Button', 'sv_gutenform' ),
	description: __( 'A radio button, that can be selected.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Radio Button', 'sv_gutenform' ),
		__( 'Radio Button', 'sv_gutenform' ),
		__( 'Radio', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		// Input Settings
		isChecked: {
			type: 'boolean',
		},
		label: {
			type: 'string',
			default: __( 'Radio Button Label', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		value: {
			type: 'string',
		},

		// Color Settings
		labelColor: {
			type: 'string',
		},
		labelColorClass: {
			type: 'string',
		},

		// Advanced Settings
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