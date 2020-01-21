// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks

registerBlockType( 'straightvisions/sv-gutenform-range', {
	title: __( 'Range', 'sv_gutenform' ),
	description: __( 'A field for range.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Range', 'sv_gutenform' ),
		__( 'Range Input', 'sv_gutenform' ),
		__( 'Range', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	styles: [
		{ label: __( 'Horizontal', 'sv_gutenform' ), name: 'horizontal', isDefault: true },
		{ label:__( 'Vertical', 'sv_gutenform' ), name: 'vertical' },
	],
	attributes: {
		inputId: {
			type: 'string',
		},

		// Input Settings
		defaultValue: {
			type: 'number',
		},
		label: {
			type: 'string',
			default: __( 'Range Label', 'sv_gutenform' ),
		},
		name: {
			type: 'string',
		},
		type: {
			type: 'string',
			default: 'range',
		},

		// Validation Settings
		required: {
			type: 'boolean',
		},
		min: {
			type: 'number',
			default: 0,
		},
		max: {
			type: 'number',
			default: 100,
		},
		step: {
			type: 'number',
			default: 1,
		},

		// Display Settings
		showValue: {
			type: 'boolean',
			default: true,
		},
		showMin: {
			type: 'boolean',
		},
		showMax: {
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