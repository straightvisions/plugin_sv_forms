// Required Components
import './editor.scss';
import icon from './icons/block';
import edit from './edit';

const { __ } 				= wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } 		= wp.blockEditor;

registerBlockType( 'straightvisions/sv-gutenform-confirmation-mail', {
	title: __( 'Confirmation Mail', 'sv_gutenform' ),
	description: __( 'Creates the content of the confirmation mail.', 'sv_gutenform' ),
	icon,
	//parent: ['straightvisions/sv-gutenform'],
	category: 'straightvisions',
	keywords: [
		__( 'SV Gutenform Confirmation Mail', 'sv_gutenform' ),
		__( 'Confirmation Mail', 'sv_gutenform' ),
		__( 'User Mail', 'sv_gutenform' ),
	],
	supports: {
		align:[ 'left', 'right', 'center', 'wide', 'full' ],
	},
	attributes: {
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