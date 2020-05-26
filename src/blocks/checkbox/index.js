// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { 
	registerBlockType, 
	registerBlockStyle 
} = wp.blocks;

registerBlockType( 'straightvisions/sv-forms-checkbox', {
	title: __( 'Checkbox', 'sv_forms' ),
	description: __( 'A checkbox that can be checked.', 'sv_forms' ),
	icon,
	parent: [ 'straightvisions/sv-forms-form' ],
	category: 'straightvisions',
	keywords: [
		__( 'SV Forms Checkbox', 'sv_forms' ),
		__( 'Checkbox Input', 'sv_forms' ),
		__( 'Checkbox', 'sv_forms' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		inputId: {
			type: 'string',
		},

		// Input Settings
		isChecked: {
			type: 'boolean',
		},
		label: {
			type: 'string',
			default: __( 'Checkbox', 'sv_forms' )
		},
		name: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'checkbox',
		},
		value: {
			type: 'string',
		},

		// Validation Settings
		required: {
			type: 'boolean',
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

registerBlockStyle( 'straightvisions/sv-forms-checkbox', [ 
	{
		name: 'checkbox',
		label: 'Checkbox',
		isDefault: true,
	},
	{
		name: 'toggle',
		label: 'Toggle',
	}
]);