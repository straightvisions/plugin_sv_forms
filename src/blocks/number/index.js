// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-forms-number', {
	title: __( 'Number', 'sv_forms' ),
	description: __( 'A field for numbers.', 'sv_forms' ),
	icon,
	parent: [ 'straightvisions/sv-forms-form' ],
	category: 'straightvisions',
	keywords: [
		__( 'SV Forms Number', 'sv_forms' ),
		__( 'Number Input', 'sv_forms' ),
		__( 'Number', 'sv_forms' ),
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