// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-select', {
	title: __( 'Select', 'sv_gutenform' ),
	description: __( 'Create a select field.', 'sv_gutenform' ),
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
		__( 'SV Gutenform Select', 'sv_gutenform' ),
		__( 'Select Field', 'sv_gutenform' ),
		__( 'Select', 'sv_gutenform' ),
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
			default: __( 'Select Label', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'select',
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

		// Border Settings
		borderRadius: {
			type: 'number',
		},

		// Advanced Settings
		autofocus: {
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