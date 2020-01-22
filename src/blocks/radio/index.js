// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-radio', {
	title: __( 'Radio Button', 'sv_gutenform' ),
	description: __( 'Create a radio button.', 'sv_gutenform' ),
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
		inputId: {
			type: 'string',
		},
		
		// Input Settings
		defaultValue: {
			type: 'string',
		},
		label: {
			type: 'string',
			default: __( 'Radio Button Label', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'radio',
		},
		options: {
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