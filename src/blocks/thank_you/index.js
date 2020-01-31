// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor;

registerBlockType( 'straightvisions/sv-gutenform-thank-you', {
	title: __( 'Thank You Message', 'sv_gutenform' ),
	description: __( 'This message will be shown to users, who submitted this form.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Thank You', 'sv_gutenform' ),
		__( 'Thank You Message', 'sv_gutenform' ),
		__( 'Thank You Page', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
		formInputs: {
			type: 'string',
		},
		collapsed: {
			type: 'boolean',
		},
		
		// Advanced Settings
		className: {
			type: 'string',
		},
	},
	edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );