!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1),n(8),n(17),n(26)},function(e,t,n){"use strict";var r=n(2),o=(n.n(r),n(3)),l=n(4),a=n(7),__=wp.i18n.__,u=wp.blocks.registerBlockType;wp.blockEditor.InnerBlocks;u("straightvisions/sv-gutenform",{title:__("SV Gutenform","sv_gutenform"),description:__("Create a form.","sv_gutenform"),icon:o.a,category:"straightvisions",keywords:[__("SV Gutenform","sv_gutenform"),__("Form","sv_gutenform"),__("Contact Form","sv_gutenform")],supports:{align:["wide","full"]},attributes:{ID:{type:"number"},adminMail:{type:"string",default:"disabled"},adminMailUser:{type:"number"},adminMailCustom:{type:"string"},confirmationMail:{type:"boolean",default:!1},confirmationMailContent:{type:"string"},className:{type:"string"}},edit:l.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M13 17h4v1h-4v-1zm0-1h4v-1h-4v1zm9-14v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-7 9h4v-1h-4v1zm0-2h4v-1h-4v1zm-6.5.077l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.288c-.963.841-1.669 1.777-2.686 3.6-.626-.738-1.044-1.208-1.814-1.923zm.098 5l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.289c-.963.841-1.669 1.777-2.686 3.6-.627-.739-1.045-1.209-1.814-1.924z"}))},function(e,t,n){"use strict";var r=n(5),__=wp.i18n.__,o=wp.data.withSelect,l=wp.element.Fragment,a=wp.blockEditor.InnerBlocks,u=[["core/heading",{content:__("Contact","sv_gutenform"),level:3}],["straightvisions/sv-gutenform-text",{label:__("Name","sv_gutenform"),name:"name",required:!0,autofocus:!0}],["straightvisions/sv-gutenform-email",{label:__("E-Mail","sv_gutenform"),name:"email",isRecipient:!0}],["straightvisions/sv-gutenform-submit"]];t.a=o(function(e,t){var n=e("core"),r=n.getAuthors,o=e("core/block-editor"),l=o.getBlocks;if(Number.isInteger(t.attributes.ID)){var a=l();a.filter(function(e){return"straightvisions/sv-gutenform"===e.name})}return{props:t,data:{authors:r()}}})(function(e){var t=e.props,n=e.data,o=t.className,i=t.attributes.ID;return wp.element.createElement(l,{className:o},wp.element.createElement(r.a,{props:t,data:n}),wp.element.createElement("form",{method:"POST",className:o},wp.element.createElement("div",null,"Form ID - ",i),wp.element.createElement(a,{template:u,templateLock:!1})))})},function(e,t,n){"use strict";var r=n(6),o=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props,n=e.data;return t&&n?wp.element.createElement(o,null,wp.element.createElement(r.a,{props:t,data:n})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.compose.withState,o=wp.components,l=o.PanelBody,a=o.Button,u=o.Modal,i=o.TextControl,s=o.SelectControl,c=o.ToggleControl;t.a=function(e){var t=e.props,n=e.data;if(!t||!n)return"";var o=t.setAttributes,m=t.attributes,p=m.adminMail,g=m.adminMailUser,f=m.adminMailCustom,d=m.confirmationMail,v=r({isOpen:!1})(function(e){var t=e.isOpen,n=e.setState;return wp.element.createElement("div",null,wp.element.createElement(a,{isDefault:!0,onClick:function(){return n({isOpen:!0})}},__("Edit Mail Content","sv_gutenform")),t&&wp.element.createElement(u,{title:"This is my modal",onRequestClose:function(){return n({isOpen:!1})},shouldCloseOnEsc:!1},wp.element.createElement(a,{isPrimary:!0,onClick:function(){return n({isOpen:!1})}},__("Save & Close","sv_gutenform"))))}),b=function(){var e=[];return n.authors.map(function(t){e.push({label:t.name,value:t.id})}),e};return wp.element.createElement(l,{title:__("Form Settings","sv_gutenform"),initialOpen:!1},wp.element.createElement(s,{label:__("Admin Mail","sv_gutenform"),value:p,options:[{label:"Disabled",value:"disabled"},{label:"Send to Author",value:"author"},{label:"Send to Mail",value:"custom"}],onChange:function(e){o({adminMail:e}),"author"===e&&o({adminMailUser:b()[0].value})}}),"author"===p?wp.element.createElement(s,{label:__("Author","sv_gutenform"),value:g,options:b(),onChange:function(e){return o({adminMailUser:e})}}):null,"custom"===p?wp.element.createElement(i,{label:__("E-Mail","sv_gutenform"),type:"email",value:f,onChange:function(e){return o({adminMailCustom:e})}}):null,wp.element.createElement(c,{label:__("Confirmation Mail","sv_gutenform"),checked:d,onChange:function(){return o({confirmationMail:!d})}}),d?wp.element.createElement(v,null):null)}},function(e,t,n){"use strict";var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=wp.blockEditor.InnerBlocks,l=wp.data.dispatch("core/editor"),a=l.editPost,u=wp.data.select("core/block-editor"),i=u.getBlocks,s=wp.data.select("core/editor"),c=s.getEditedPostAttribute,m=!1;t.a=function(){var e=c("meta"),t=i();if("object"===("undefined"===typeof e?"undefined":r(e))&&!m){if(Object.keys(t).length>0){var n=t.filter(function(e){return"straightvisions/sv-gutenform"===e.name});if(n.length>0){var l={};e._sv_gutenform_forms&&""!==e._sv_gutenform_forms&&(l=JSON.parse(e._sv_gutenform_forms));var u=Object.keys(l);u.length>0&&(u.map(function(e){n.map(function(t){var n=t.attributes.ID;return!Number.isInteger(n)||n!==e})[0]&&delete l[e]}),u=Object.keys(l));var s=u.length-1,p=s+1;n.map(function(e){Number.isInteger(e.attributes.ID)?l[e.attributes.ID]=e.attributes:(e.attributes.ID=p,l[p]=e.attributes,p++)}),console.log(l),console.log(n),a({meta:{_sv_gutenform_forms:JSON.stringify(l)}})}}m=!0}return wp.element.createElement(o.Content,null)}},function(e,t,n){"use strict";var r=n(9),o=(n.n(r),n(10)),l=n(11),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-text",{title:__("Text","sv_gutenform"),description:__("A field for short texts.","sv_gutenform"),icon:o.a,category:"straightvisions",keywords:[__("SV Gutenform Text","sv_gutenform"),__("Text Input","sv_gutenform"),__("Text","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("Text Label","sv_gutenform")},name:{type:"string"},placeholder:{type:"string"},required:{type:"boolean",default:!1},minlength:{type:"number",default:0},maxlength:{type:"number",default:0},labelColor:{type:"string"},labelColorClass:{type:"string"},inputColor:{type:"string"},inputColorClass:{type:"string"},inputBackgroundColor:{type:"string"},inputBackgroundColorClass:{type:"string"},autofocus:{type:"boolean",default:!1},autocomplete:{type:"boolean",default:!1},readonly:{type:"boolean",default:!1},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:l.a,save:function(){return null}})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z"}))},function(e,t,n){"use strict";var r=n(12),o=wp.data.withSelect,l=wp.element.Fragment,a=wp.components.TextControl;t.a=o(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,o=e.attributes,u=o.defaultValue,i=o.label,s=o.name,c=o.placeholder,m=o.required,p=o.minlength,g=o.maxlength,f=o.labelColor,d=o.labelColorClass,v=o.inputColor,b=o.inputColorClass,h=o.inputBackgroundColor,w=o.inputBackgroundColorClass,C=o.autofocus,_=o.autocomplete,y=o.readonly,E=o.disabled;return wp.element.createElement(l,null,wp.element.createElement(r.a,{props:e}),wp.element.createElement("div",{className:t},i.length>0?wp.element.createElement("label",{for:s,style:{color:f},className:d},i):null,wp.element.createElement(a,{type:"text",name:s,label:i,required:m,disabled:E,readonly:y,value:u,minlength:p>0?p:-1,maxlength:g>0?g:-1,autofocus:C,placeholder:c,autocomplete:_,style:{color:v,backgroundColor:h},className:[b,w],onChange:function(e){return n({defaultValue:e})},hideLabelFromVision:!0})))})},function(e,t,n){"use strict";var r=n(13),o=n(14),l=n(15),a=n(16),u=wp.element.Fragment,i=wp.blockEditor,s=i.InspectorControls,c=i.InspectorAdvancedControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(u,null,wp.element.createElement(s,null,wp.element.createElement(r.a,{props:t}),wp.element.createElement(o.a,{props:t}),wp.element.createElement(a.a,{props:t})),wp.element.createElement(c,null,wp.element.createElement(l.a,{props:t}))):""}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.components,o=r.PanelBody,l=r.TextControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var r=n.setAttributes,a=n.attributes,u=a.label,i=a.name,s=a.placeholder;return wp.element.createElement(o,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(l,{label:__("Label","sv_gutenform"),value:u,onChange:function(e){r({label:e}),r({name:t(e)})}}),wp.element.createElement(l,{label:__("Name","sv_gutenform"),value:t(i),onChange:function(e){return r({name:t(e)})}}),wp.element.createElement(l,{label:__("Placeholder","sv_gutenform"),value:s,onChange:function(e){return r({placeholder:e})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.components,o=r.PanelBody,l=r.RangeControl,a=r.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,r=t.attributes,u=r.required,i=r.minlength,s=r.maxlength;return wp.element.createElement(o,{title:__("Validation Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(a,{label:__("Required","sv_gutenform"),checked:u,onChange:function(){return n({required:!u})}}),wp.element.createElement(l,{label:__("Min. Length","sv_gutenform"),help:__("Defines the min. character length.","sv_gutenform"),value:i,onChange:function(e){return n({minlength:e})},min:0,max:50}),wp.element.createElement(l,{label:__("Max. Length","sv_gutenform"),help:__("Defines the max. character length.","sv_gutenform"),value:s,onChange:function(e){return n({maxlength:e})},min:0,max:50}))}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.element.Fragment,o=wp.components.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,l=t.attributes,a=l.autofocus,u=l.autocomplete,i=l.readonly,s=l.disabled;return wp.element.createElement(r,null,wp.element.createElement(o,{label:__("Autofocus","sv_gutenform"),checked:a,onChange:function(){return n({autofocus:!a})}}),wp.element.createElement(o,{label:__("Autocomplete","sv_gutenform"),checked:u,onChange:function(){return n({autocomplete:!u})}}),wp.element.createElement(o,{label:__("Read Only","sv_gutenform"),checked:i,onChange:function(){return n({readonly:!i})}}),wp.element.createElement(o,{label:__("Disabled","sv_gutenform"),checked:s,onChange:function(){return n({disabled:!s})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.blockEditor,o=r.PanelColorSettings,l=r.getColorObjectByColorValue,a=r.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return l(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var r=e.props;if(!r)return"";var u=r.setAttributes,i=r.attributes,s=i.labelColor,c=i.inputColor,m=i.inputBackgroundColor,p=[{value:s,onChange:function(e){u({labelColor:e}),u({labelColorClass:n(e)})},label:__("Label","sv_gutenform")},{value:c,onChange:function(e){u({inputColor:e}),u({inputColorClass:n(e)})},label:__("Input","sv_gutenform")},{value:m,onChange:function(e){u({inputBackgroundColor:e}),u({inputBackgroundColorClass:n(e,"background-color")})},label:__("Input Background","sv_gutenform")}];return wp.element.createElement(o,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:p})}},function(e,t,n){"use strict";var r=n(18),o=(n.n(r),n(19)),l=n(20),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-email",{title:__("E-Mail","sv_gutenform"),description:__("A field for an e-mail adress.","sv_gutenform"),icon:o.a,category:"straightvisions",keywords:[__("SV Gutenform E-Mail","sv_gutenform"),__("E-Mail Input","sv_gutenform"),__("E-Mail","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("E-Mail Label","sv_gutenform")},name:{type:"string"},placeholder:{type:"string"},isRecipient:{type:"boolean",default:!1},required:{type:"boolean",default:!1},minlength:{type:"number",default:0},maxlength:{type:"number",default:0},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},autofocus:{type:"boolean",default:!1},autocomplete:{type:"boolean",default:!1},readonly:{type:"boolean",default:!1},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:l.a,save:function(){return null}})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"}))},function(e,t,n){"use strict";var r=n(21),o=wp.data.withSelect,l=wp.element.Fragment,a=wp.components.TextControl;t.a=o(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,o=e.attributes,u=o.defaultValue,i=o.label,s=o.name,c=o.placeholder,m=o.isRecipient,p=o.required,g=o.minlength,f=o.maxlength,d=o.labelColor,v=o.labelColorClass,b=o.inputColor,h=o.inputColorClass,w=o.inputBackgroundColor,C=o.inputBackgroundColorClass,_=o.autofocus,y=o.autocomplete,E=o.readonly,k=o.disabled;return wp.element.createElement(l,null,wp.element.createElement(r.a,{props:e}),wp.element.createElement("div",{className:t},i.length>0?wp.element.createElement("label",{for:s,style:{color:d},className:v},i):null,wp.element.createElement(a,{type:"email",name:s,label:i,required:!(!p&&!m),disabled:k,readonly:E,value:u,minlength:g>0?g:-1,maxlength:f>0?f:-1,autofocus:_,placeholder:c,autocomplete:y,style:{color:b,backgroundColor:w},className:[h,C],onChange:function(e){return n({defaultValue:e})},hideLabelFromVision:!0})))})},function(e,t,n){"use strict";var r=n(22),o=n(23),l=n(24),a=n(25),u=wp.element.Fragment,i=wp.blockEditor,s=i.InspectorControls,c=i.InspectorAdvancedControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(u,null,wp.element.createElement(s,null,wp.element.createElement(r.a,{props:t}),wp.element.createElement(o.a,{props:t}),wp.element.createElement(a.a,{props:t})),wp.element.createElement(c,null,wp.element.createElement(l.a,{props:t}))):""}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.components,o=r.PanelBody,l=r.TextControl,a=r.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var r=n.setAttributes,u=n.attributes,i=u.label,s=u.name,c=u.placeholder,m=u.isRecipient;return wp.element.createElement(o,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(l,{label:__("Label","sv_gutenform"),value:i,onChange:function(e){r({label:e}),r({name:t(e)})}}),wp.element.createElement(l,{label:__("Name","sv_gutenform"),value:t(s),onChange:function(e){return r({name:t(e)})}}),wp.element.createElement(l,{label:__("Placeholder","sv_gutenform"),value:c,onChange:function(e){return r({placeholder:e})}}),wp.element.createElement(a,{label:__("Is Recipient?","sv_gutenform"),help:__("When checked, an confirmation mail will be sent to this e-mail.","sv_gutenform"),checked:m,onChange:function(){r({isRecipient:!m}),r({required:!m})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.components,o=r.PanelBody,l=r.RangeControl,a=r.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,r=t.attributes,u=r.isRecipient,i=r.required,s=r.minlength,c=r.maxlength;return wp.element.createElement(o,{title:__("Validation Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(a,{label:__("Required","sv_gutenform"),checked:!(!i&&!u),onChange:function(){return n({required:!i})}}),wp.element.createElement(l,{label:__("Min. Length","sv_gutenform"),help:__("Defines the min. character length.","sv_gutenform"),value:s,onChange:function(e){return n({minlength:e})},min:0,max:50}),wp.element.createElement(l,{label:__("Max. Length","sv_gutenform"),help:__("Defines the max. character length.","sv_gutenform"),value:c,onChange:function(e){return n({maxlength:e})},min:0,max:50}))}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.element.Fragment,o=wp.components.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,l=t.attributes,a=l.autofocus,u=l.autocomplete,i=l.readonly,s=l.disabled;return wp.element.createElement(r,null,wp.element.createElement(o,{label:__("Autofocus","sv_gutenform"),checked:a,onChange:function(){return n({autofocus:!a})}}),wp.element.createElement(o,{label:__("Autocomplete","sv_gutenform"),checked:u,onChange:function(){return n({autocomplete:!u})}}),wp.element.createElement(o,{label:__("Read Only","sv_gutenform"),checked:i,onChange:function(){return n({readonly:!i})}}),wp.element.createElement(o,{label:__("Disabled","sv_gutenform"),checked:s,onChange:function(){return n({disabled:!s})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.blockEditor,o=r.PanelColorSettings,l=r.getColorObjectByColorValue,a=r.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return l(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var r=e.props;if(!r)return"";var u=r.setAttributes,i=r.attributes,s=i.labelColor,c=i.inputColor,m=i.inputBackgroundColor,p=[{value:s,onChange:function(e){u({labelColor:e}),u({labelColorClass:n(e)})},label:__("Label","sv_gutenform")},{value:c,onChange:function(e){u({inputColor:e}),u({inputColorClass:n(e)})},label:__("Input","sv_gutenform")},{value:m,onChange:function(e){u({inputBackgroundColor:e}),u({inputBackgroundColorClass:n(e,"background-color")})},label:__("Input Background","sv_gutenform")}];return wp.element.createElement(o,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:p})}},function(e,t,n){"use strict";var r=n(27),o=(n.n(r),n(28)),l=n(29),a=n(32),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-submit",{title:__("Submit Button","sv_gutenform"),description:__("The submit button for the form.","sv_gutenform"),icon:o.a,category:"straightvisions",keywords:[__("SV Gutenform Submit","sv_gutenform"),__("Submit","sv_gutenform"),__("Button","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{content:{type:"string",default:__("Submit","sv_gutenform")},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},className:{type:"string"}},edit:l.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"}))},function(e,t,n){"use strict";var r=n(30),o=wp.data.withSelect,l=wp.element.Fragment,a=wp.blockEditor.RichText;t.a=o(function(e,t){return t})(function(e){var t=e.className,n=e.attributes,o=n.content,u=n.textColor,i=n.textColorClass,s=n.backgroundColor,c=n.backgroundColorClass;return wp.element.createElement(l,null,wp.element.createElement(r.a,{props:e}),wp.element.createElement(a,{className:[i,c,t],style:{color:u,backgroundColor:s},value:o,onChange:function(e){return setAttributes({content:e})}}))})},function(e,t,n){"use strict";var r=n(31),o=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(o,null,wp.element.createElement(r.a,{props:t})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,r=wp.blockEditor,o=r.PanelColorSettings,l=r.getColorObjectByColorValue,a=r.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return l(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var r=e.props;if(!r)return"";var u=r.setAttributes,i=r.attributes,s=i.textColor,c=i.backgroundColor,m=[{value:s,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(o,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.content,r=t.textColor,o=t.textColorClass,l=t.backgroundColor,a=t.backgroundColorClass;return wp.element.createElement("button",{className:[o,a],style:{color:o?null:r,backgroundColor:a?null:l},type:"submit"},n)}}]);