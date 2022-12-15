// Constant available for all blocks
const WrapperContext = wp.element.createContext({});
export const WrapperConsumer = WrapperContext.Consumer;
export const WrapperProvider = WrapperContext.Provider;

const InputsContext = wp.element.createContext([]);
export const InputsConsumer = InputsContext.Consumer;
export const InputsProvider = InputsContext.Provider;

// Wrapper Blocks
import './components/wrapper/index.js';
import './components/form/index.js';
import './components/thank_you/index.js';
import './components/user_mail/index.js';
import './components/admin_mail/index.js';

// Form Blocks
import './components/spam_guard/index.js';
import './components/text/index.js';
import './components/email/index.js';
import './components/url/index.js';
import './components/number/index.js';
import './components/phone/index.js';
import './components/textarea/index.js';
import './components/checkbox/index.js';
import './components/radio/index.js';
import './components/select/index.js';
import './components/submit/index.js';
import './components/password/index.js';
import './components/date/index.js';
import './components/range/index.js';
import './components/file/index.js';
import './components/hidden/index.js';