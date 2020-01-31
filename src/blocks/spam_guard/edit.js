// Required Components
import shieldIcon from './icons/block';
import honeycombIcon from './icons/honeycomb';
import timerIcon from './icons/timer';

import InspectorControls from './components/inspector_controls';
import { FormContext } from '../../blocks';

const { 
    Component, 
    Fragment 
} = wp.element;
const { __ } = wp.i18n;
const { Placeholder, Button } = wp.components;

export default class extends Component {
    constructor(props) {
        super(...arguments);

        this.props = props;
        this.wrapper = {};
    }

    // React Lifecycle Methos
    componentDidMount = () => {}

    componentDidUpdate = () => {}

    componentWillUnmount = () => {}

    // The following methods update the attributes of this block
    setHoneypot = honeypot => this.props.setAttributes({ honeypot });
    setTimeTrap = timeTrap => this.props.setAttributes({ timeTrap });

    // Updates the spam guard attributes in the wrapper block
    setFormAttributes = wrapper => {
        this.wrapper = wrapper;

        const {
            honeypot,
            timeTrap,
            timeTrapWindow,
        } = this.props.attributes;

        const newSpamGuardAttributes = { 
            sgHoneypot: honeypot, 
            sgTimeTrap: timeTrap, 
            sgTimeTrapWindow: timeTrapWindow, 
        };

        wrapper.setAttributes( newSpamGuardAttributes );
    }

    render = () => {
        const {
            className,
            attributes: {
                honeypot,
                timeTrap,
            },
        } = this.props;

        // State vars
        const honeypotState = honeypot ? 'is-active' : '';
        const timeTrapState = timeTrap ? 'is-active' : '';

        return (
            <Fragment>
                <div className={ className }>
                    <Placeholder
                        icon={ shieldIcon }
                        label={ __( 'Spam Guard', 'sv_gutenform' ) }
                        instructions={ __( 'Select your anti spam features.', 'sv_gutenform' ) }
                    >
                        <Button 
                            icon={ honeycombIcon } 
                            className={ honeypotState }
                            onClick={ () => this.setHoneypot( ! honeypot ) }
                        >
                            { __( 'Honeypot', 'sv_gutenform' ) }
                        </Button>
                        <Button 
                            icon={ timerIcon } 
                            className={ timeTrapState }
                            onClick={ () => this.setTimeTrap( ! timeTrap ) }
                        >
                            { __( 'Time Trap', 'sv_gutenform' ) }
                        </Button>
                    </Placeholder>
                </div>
                <InspectorControls props={ this.props } wrapper={ this.wrapper } />
                <FormContext.Consumer>{ wrapper => this.setFormAttributes( wrapper ) }</FormContext.Consumer>
            </Fragment>
        );
    }
}