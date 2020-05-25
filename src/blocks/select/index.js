// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-forms-select', {
	title: __( 'Select', 'sv_forms' ),
	description: __( 'Create a select field.', 'sv_forms' ),
	icon,
	parent: [ 
		'straightvisions/sv-forms-form', 
		'core/group', 
		'core/cover',
		'core/column',
		'core/media-text',
	],
	category: 'straightvisions',
	keywords: [
		__( 'SV Forms Select', 'sv_forms' ),
		__( 'Select Field', 'sv_forms' ),
		__( 'Select', 'sv_forms' ),
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
			default: __( 'Select', 'sv_forms' ),
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
		inputBorderColor: {
			type: 'string',
			default: '#ddd',
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