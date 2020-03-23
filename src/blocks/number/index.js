// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-number', {
	title: __( 'Number', 'sv_gutenform' ),
	description: __( 'A field for numbers.', 'sv_gutenform' ),
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
		__( 'SV Gutenform Number', 'sv_gutenform' ),
		__( 'Number Input', 'sv_gutenform' ),
		__( 'Number', 'sv_gutenform' ),
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
		},
		name: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'number',
		},
		placeholder: {
			type: 'string',
			default: '0',
		},

		// Validation Settings
		required: {
			type: 'boolean',
		},
		min: {
			type: 'number',
		},
		max: {
			type: 'number',
		},
		step: {
			type: 'number',
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

		// Border Settings
		borderRadius: {
			type: 'number',
		},

		// Advanced Settings
		autofocus: {
			type: 'boolean',
		},
		readonly: {
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