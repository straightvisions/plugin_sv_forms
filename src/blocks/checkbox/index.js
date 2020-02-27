// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { 
	registerBlockType, 
	registerBlockStyle 
} = wp.blocks;

registerBlockType( 'straightvisions/sv-gutenform-checkbox', {
	title: __( 'Checkbox', 'sv_gutenform' ),
	description: __( 'A checkbox that can be checked.', 'sv_gutenform' ),
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
		__( 'SV Gutenform Checkbox', 'sv_gutenform' ),
		__( 'Checkbox Input', 'sv_gutenform' ),
		__( 'Checkbox', 'sv_gutenform' ),
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
			default: __( 'Checkbox Label', 'sv_gutenform' ),
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

registerBlockStyle( 'straightvisions/sv-gutenform-checkbox', [ 
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