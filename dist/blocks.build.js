!function(e){function t(l){if(n[l])return n[l].exports;var r=n[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1),n(8),n(18),n(28),n(38),n(45),n(52),n(60)},function(e,t,n){"use strict";var l=n(2),r=(n.n(l),n(3)),o=n(4),a=n(7),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform",{title:__("SV Gutenform","sv_gutenform"),description:__("Create a form.","sv_gutenform"),icon:r.a,category:"straightvisions",keywords:[__("SV Gutenform","sv_gutenform"),__("Form","sv_gutenform"),__("Contact Form","sv_gutenform")],supports:{align:["wide","full"]},attributes:{adminMail:{type:"string",default:"disabled"},adminMailUser:{type:"number"},adminMailCustom:{type:"string"},confirmationMail:{type:"boolean",default:!1},confirmationMailContent:{type:"string"},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M13 17h4v1h-4v-1zm0-1h4v-1h-4v1zm9-14v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-7 9h4v-1h-4v1zm0-2h4v-1h-4v1zm-6.5.077l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.288c-.963.841-1.669 1.777-2.686 3.6-.626-.738-1.044-1.208-1.814-1.923zm.098 5l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.289c-.963.841-1.669 1.777-2.686 3.6-.627-.739-1.045-1.209-1.814-1.924z"}))},function(e,t,n){"use strict";var l=n(5),__=wp.i18n.__,r=wp.data.withSelect,o=wp.element.Fragment,a=wp.blockEditor.InnerBlocks,u=["core/heading","core/spacer","straightvisions/sv-gutenform-text","straightvisions/sv-gutenform-email","straightvisions/sv-gutenform-url","straightvisions/sv-gutenform-checkbox","straightvisions/sv-gutenform-radio","straightvisions/sv-gutenform-textarea","straightvisions/sv-gutenform-submit"],s=[["core/heading",{content:__("Contact","sv_gutenform"),level:3}]];t.a=r(function(e,t){return{props:t,data:{authors:(0,e("core").getAuthors)()}}})(function(e){var t=e.props,n=e.data,r=t.className;return wp.element.createElement(o,{className:r},wp.element.createElement(l.a,{props:t,data:n}),wp.element.createElement("form",{method:"POST",className:r},wp.element.createElement(a,{allowedBlocks:u,template:s,templateLock:!1})))})},function(e,t,n){"use strict";var l=n(6),r=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props,n=e.data;return t&&n?wp.element.createElement(r,null,wp.element.createElement(l.a,{props:t,data:n})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.compose.withState,r=(wp.blockEditor.RichText,wp.components),o=r.PanelBody,a=r.Button,u=r.Modal,s=r.TextControl,i=(r.RadioControl,r.SelectControl),c=r.ToggleControl;t.a=function(e){var t=e.props,n=e.data;if(!t||!n)return"";var r=t.setAttributes,m=t.attributes,p=m.adminMail,g=m.adminMailUser,f=m.adminMailCustom,d=m.confirmationMail,v=(m.confirmationMailContent,l({isOpen:!1})(function(e){var t=e.isOpen,n=e.setState;return wp.element.createElement("div",null,wp.element.createElement(a,{isDefault:!0,onClick:function(){return n({isOpen:!0})}},__("Edit Mail Content","sv_gutenform")),t&&wp.element.createElement(u,{title:"This is my modal",onRequestClose:function(){return n({isOpen:!1})},shouldCloseOnEsc:!1},wp.element.createElement(a,{isPrimary:!0,onClick:function(){return n({isOpen:!1})}},__("Save & Close","sv_gutenform"))))}));return wp.element.createElement(o,{title:__("Form Settings","sv_gutenform"),initialOpen:!1},wp.element.createElement(i,{label:__("Admin Mail","sv_gutenform"),value:p,options:[{label:"Disabled",value:"disabled"},{label:"Send to Author",value:"author"},{label:"Send to Mail",value:"custom"}],onChange:function(e){r({adminMail:e})}}),"author"===p?wp.element.createElement(i,{label:__("Author","sv_gutenform"),value:g,options:function(){var e=[];return n.authors.map(function(t){e.push({label:t.name,value:t.id})}),e}(),onChange:function(e){r({adminMailUser:e})}}):null,"custom"===p?wp.element.createElement(s,{label:__("E-Mail","sv_gutenform"),type:"email",value:f,onChange:function(e){r({adminMailCustom:e})}}):null,wp.element.createElement(c,{label:__("Confirmation Mail","sv_gutenform"),checked:d,onChange:function(){return r({confirmationMail:!d})}}),d?wp.element.createElement(v,null):null)}},function(e,t,n){"use strict";var l=wp.blockEditor.InnerBlocks;t.a=function(e){var t=e.attributes,n=t.action,r=t.method;return wp.element.createElement("form",{action:n,method:r},wp.element.createElement(l.Content,null))}},function(e,t,n){"use strict";var l=n(9),r=(n.n(l),n(10)),o=n(11),a=n(17),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-text",{title:__("Text","sv_gutenform"),description:__("A field for short texts.","sv_gutenform"),icon:r.a,parent:["straightvisions/sv-gutenform"],category:"straightvisions",keywords:[__("SV Gutenform Text","sv_gutenform"),__("Text Input","sv_gutenform"),__("Text","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("Text Label","sv_gutenform")},name:{type:"string"},placeholder:{type:"string",default:__("Text","sv_gutenform")},required:{type:"boolean",default:!1},minlength:{type:"number",default:0},maxlength:{type:"number",default:0},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},autofocus:{type:"boolean",default:!1},autocomplete:{type:"boolean",default:!1},readonly:{type:"boolean",default:!1},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z"}))},function(e,t,n){"use strict";var l=n(12),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.components.TextControl;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,r=e.attributes,u=r.defaultValue,s=r.name,i=r.placeholder,c=r.label,m=r.required,p=r.minlength,g=r.maxlength,f=r.textColor,d=r.textColorClass,v=r.backgroundColor,b=r.backgroundColorClass,h=r.autofocus,w=r.autocomplete,C=r.readonly,E=r.disabled;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{type:"text",name:s,label:c,required:m,disabled:E,readonly:C,value:u,minlength:p,maxlength:g,autofocus:h,placeholder:i,autocomplete:w,style:{color:f,backgroundColor:v},className:[d,b,t],onChange:function(e){return n({defaultValue:e})}}))})},function(e,t,n){"use strict";var l=n(13),r=n(14),o=n(15),a=n(16),u=wp.element.Fragment,s=wp.blockEditor,i=s.InspectorControls,c=s.InspectorAdvancedControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(u,null,wp.element.createElement(i,null,wp.element.createElement(l.a,{props:t}),wp.element.createElement(r.a,{props:t}),wp.element.createElement(a.a,{props:t})),wp.element.createElement(c,null,wp.element.createElement(o.a,{props:t}))):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl;l.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,a=n.attributes,u=a.label,s=a.placeholder,i=a.name;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:u,onChange:function(e){l({label:e}),l({name:t(e)})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(i),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(o,{label:__("Placeholder","sv_gutenform"),value:s,onChange:function(e){return l({placeholder:e})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.RangeControl,a=l.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,l=t.attributes,u=l.required,s=l.minlength,i=l.maxlength;return wp.element.createElement(r,{title:__("Validation Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(a,{label:__("Required","sv_gutenform"),checked:u,onChange:function(){return n({required:!u})}}),wp.element.createElement(o,{label:__("Min. Length","sv_gutenform"),help:__("Defines the min. character length.","sv_gutenform"),value:s,onChange:function(e){return n({minlength:e})},min:0,max:50}),wp.element.createElement(o,{label:__("Max. Length","sv_gutenform"),help:__("Defines the max. character length.","sv_gutenform"),value:i,onChange:function(e){return n({maxlength:e})},min:0,max:50}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.element.Fragment,r=wp.components.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,o=t.attributes,a=o.autofocus,u=o.autocomplete,s=o.readonly,i=o.disabled;return wp.element.createElement(l,null,wp.element.createElement(r,{label:__("Autofocus","sv_gutenform"),checked:a,onChange:function(){return n({autofocus:!a})}}),wp.element.createElement(r,{label:__("Autocomplete","sv_gutenform"),checked:u,onChange:function(){return n({autocomplete:!u})}}),wp.element.createElement(r,{label:__("Read Only","sv_gutenform"),checked:s,onChange:function(){return n({readonly:!s})}}),wp.element.createElement(r,{label:__("Disabled","sv_gutenform"),checked:i,onChange:function(){return n({disabled:!i})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,s=l.attributes,i=s.textColor,c=s.backgroundColor,m=[{value:i,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.defaultValue,l=t.name,r=t.placeholder,o=t.label,a=t.disabled,u=t.textColor,s=t.textColorClass,i=t.backgroundColor,c=t.backgroundColorClass;return wp.element.createElement("fieldset",null,o?wp.element.createElement("label",{for:l},o):null,wp.element.createElement("input",{type:"text",id:l,name:l,value:n,placeholder:r,className:[s,c],style:{color:s?null:u,backgroundColor:c?null:i},disabled:a}))}},function(e,t,n){"use strict";var l=n(19),r=(n.n(l),n(20)),o=n(21),a=n(27),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-email",{title:__("E-Mail","sv_gutenform"),description:__("A field for an e-mail adress.","sv_gutenform"),icon:r.a,parent:["straightvisions/sv-gutenform"],category:"straightvisions",keywords:[__("SV Gutenform E-Mail","sv_gutenform"),__("E-Mail Input","sv_gutenform"),__("E-Mail","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("E-Mail Label","sv_gutenform")},name:{type:"string"},placeholder:{type:"string",default:__("E-Mail","sv_gutenform")},required:{type:"boolean",default:!1},minlength:{type:"number",default:0},maxlength:{type:"number",default:0},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},autofocus:{type:"boolean",default:!1},autocomplete:{type:"boolean",default:!1},readonly:{type:"boolean",default:!1},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"}))},function(e,t,n){"use strict";var l=n(22),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.components.TextControl;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,r=e.attributes,u=r.defaultValue,s=r.name,i=r.placeholder,c=r.label,m=r.required,p=r.minlength,g=r.maxlength,f=r.textColor,d=r.textColorClass,v=r.backgroundColor,b=r.backgroundColorClass,h=r.autofocus,w=r.autocomplete,C=r.readonly,E=r.disabled;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{type:"email",name:s,label:c,required:m,disabled:E,readonly:C,value:u,minlength:p,maxlength:g,autofocus:h,placeholder:i,autocomplete:w,style:{color:f,backgroundColor:v},className:[d,b,t],onChange:function(e){return n({defaultValue:e})}}))})},function(e,t,n){"use strict";var l=n(23),r=n(24),o=n(25),a=n(26),u=wp.element.Fragment,s=wp.blockEditor,i=s.InspectorControls,c=s.InspectorAdvancedControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(u,null,wp.element.createElement(i,null,wp.element.createElement(l.a,{props:t}),wp.element.createElement(r.a,{props:t}),wp.element.createElement(a.a,{props:t})),wp.element.createElement(c,null,wp.element.createElement(o.a,{props:t}))):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl;l.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,a=n.attributes,u=a.label,s=a.placeholder,i=a.name;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:u,onChange:function(e){l({label:e}),l({name:t(e)})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(i),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(o,{label:__("Placeholder","sv_gutenform"),value:s,onChange:function(e){return l({placeholder:e})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.RangeControl,a=l.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,l=t.attributes,u=l.required,s=l.minlength,i=l.maxlength;return wp.element.createElement(r,{title:__("Validation Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(a,{label:__("Required","sv_gutenform"),checked:u,onChange:function(){return n({required:!u})}}),wp.element.createElement(o,{label:__("Min. Length","sv_gutenform"),help:__("Defines the min. character length.","sv_gutenform"),value:s,onChange:function(e){return n({minlength:e})},min:0,max:50}),wp.element.createElement(o,{label:__("Max. Length","sv_gutenform"),help:__("Defines the max. character length.","sv_gutenform"),value:i,onChange:function(e){return n({maxlength:e})},min:0,max:50}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.element.Fragment,r=wp.components.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,o=t.attributes,a=o.autofocus,u=o.autocomplete,s=o.readonly,i=o.disabled;return wp.element.createElement(l,null,wp.element.createElement(r,{label:__("Autofocus","sv_gutenform"),checked:a,onChange:function(){return n({autofocus:!a})}}),wp.element.createElement(r,{label:__("Autocomplete","sv_gutenform"),checked:u,onChange:function(){return n({autocomplete:!u})}}),wp.element.createElement(r,{label:__("Read Only","sv_gutenform"),checked:s,onChange:function(){return n({readonly:!s})}}),wp.element.createElement(r,{label:__("Disabled","sv_gutenform"),checked:i,onChange:function(){return n({disabled:!i})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,s=l.attributes,i=s.textColor,c=s.backgroundColor,m=[{value:i,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.defaultValue,l=t.name,r=t.placeholder,o=t.label,a=t.disabled,u=t.textColor,s=t.textColorClass,i=t.backgroundColor,c=t.backgroundColorClass;return wp.element.createElement("fieldset",null,o?wp.element.createElement("label",{for:l},o):null,wp.element.createElement("input",{type:"email",id:l,name:l,value:n,placeholder:r,className:[s,c],style:{color:s?null:u,backgroundColor:c?null:i},disabled:a}))}},function(e,t,n){"use strict";var l=n(29),r=(n.n(l),n(30)),o=n(31),a=n(37),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-url",{title:__("URL","sv_gutenform"),description:__("A field for a url.","sv_gutenform"),icon:r.a,parent:["straightvisions/sv-gutenform"],category:"straightvisions",keywords:[__("SV Gutenform URL","sv_gutenform"),__("URL Input","sv_gutenform"),__("URL","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("URL Label","sv_gutenform")},name:{type:"string"},placeholder:{type:"string",default:__("URL","sv_gutenform")},required:{type:"boolean",default:!1},minlength:{type:"number",default:0},maxlength:{type:"number",default:0},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},autofocus:{type:"boolean",default:!1},autocomplete:{type:"boolean",default:!1},readonly:{type:"boolean",default:!1},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z"}))},function(e,t,n){"use strict";var l=n(32),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.components.TextControl;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,r=e.attributes,u=r.defaultValue,s=r.name,i=r.placeholder,c=r.label,m=r.required,p=r.minlength,g=r.maxlength,f=r.textColor,d=r.textColorClass,v=r.backgroundColor,b=r.backgroundColorClass,h=r.autofocus,w=r.autocomplete,C=r.readonly,E=r.disabled;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{type:"url",name:s,label:c,required:m,disabled:E,readonly:C,value:u,minlength:p>0?p:"",maxlength:g>0?g:"",autofocus:h,placeholder:i,autocomplete:w,style:{color:f,backgroundColor:v},className:[d,b,t],onChange:function(e){return n({defaultValue:e})}}))})},function(e,t,n){"use strict";var l=n(33),r=n(34),o=n(35),a=n(36),u=wp.element.Fragment,s=wp.blockEditor,i=s.InspectorControls,c=s.InspectorAdvancedControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(u,null,wp.element.createElement(i,null,wp.element.createElement(l.a,{props:t}),wp.element.createElement(r.a,{props:t}),wp.element.createElement(a.a,{props:t})),wp.element.createElement(c,null,wp.element.createElement(o.a,{props:t}))):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl;l.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,a=n.attributes,u=a.label,s=a.placeholder,i=a.name;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:u,onChange:function(e){l({label:e}),l({name:t(e)})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(i),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(o,{label:__("Placeholder","sv_gutenform"),value:s,onChange:function(e){return l({placeholder:e})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.RangeControl,a=l.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,l=t.attributes,u=l.required,s=l.minlength,i=l.maxlength;return wp.element.createElement(r,{title:__("Validation Settings","sv_gutenform"),initialOpen:!1},wp.element.createElement(a,{label:__("Required","sv_gutenform"),checked:u,onChange:function(){return n({required:!u})}}),wp.element.createElement(o,{label:__("Min. Length","sv_gutenform"),help:__("Defines the min. character length. 0 = Disabled","sv_gutenform"),value:s,onChange:function(e){return n({minlength:e})},min:0,max:50}),wp.element.createElement(o,{label:__("Max. Length","sv_gutenform"),help:__("Defines the max. character length. 0 = Disabled","sv_gutenform"),value:i,onChange:function(e){return n({maxlength:e})},min:0,max:50}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.element.Fragment,r=wp.components.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,o=t.attributes,a=o.autofocus,u=o.autocomplete,s=o.readonly,i=o.disabled;return wp.element.createElement(l,null,wp.element.createElement(r,{label:__("Autofocus","sv_gutenform"),checked:a,onChange:function(){return n({autofocus:!a})}}),wp.element.createElement(r,{label:__("Autocomplete","sv_gutenform"),checked:u,onChange:function(){return n({autocomplete:!u})}}),wp.element.createElement(r,{label:__("Read Only","sv_gutenform"),checked:s,onChange:function(){return n({readonly:!s})}}),wp.element.createElement(r,{label:__("Disabled","sv_gutenform"),checked:i,onChange:function(){return n({disabled:!i})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,s=l.attributes,i=s.textColor,c=s.backgroundColor,m=[{value:i,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.defaultValue,l=t.name,r=t.placeholder,o=t.label,a=t.required,u=t.minlength,s=t.maxlength,i=t.textColor,c=t.textColorClass,m=t.backgroundColor,p=t.backgroundColorClass,g=t.autofocus,f=t.autocomplete,d=t.readonly,v=t.disabled;return wp.element.createElement("fieldset",null,o?wp.element.createElement("label",{for:l},o):null,wp.element.createElement("input",{type:"url",id:l,name:l,label:o,required:a,disabled:v,readonly:d,value:n,minlength:u>0?u:"",maxlength:s>0?s:"",autofocus:g,placeholder:r,autocomplete:f?"on":"off",className:[c,p],style:{color:c?null:i,backgroundColor:p?null:m}}))}},function(e,t,n){"use strict";var l=n(39),r=(n.n(l),n(40)),o=n(41),a=n(44),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-checkbox",{title:__("Checkbox","sv_gutenform"),description:__("A checkbox for an option to select.","sv_gutenform"),icon:r.a,parent:["straightvisions/sv-gutenform"],category:"straightvisions",keywords:[__("SV Gutenform Checkbox","sv_gutenform"),__("Checkbox Input","sv_gutenform"),__("Checkbox","sv_gutenform")],supports:{align:["left","right","center"]},attributes:{isChecked:{type:"boolean",default:!1},value:{type:"string"},label:{type:"string",default:__("Text Label","sv_gutenform")},name:{type:"string"},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"}))},function(e,t,n){"use strict";var l=n(42),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.components.TextControl;t.a=r(function(e,t){return t})(function(e){var t=(e.className,e.setAttributes),n=e.attributes,r=n.isChecked,u=n.value,s=n.name,i=n.label,c=n.disabled;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{type:"checkbox",name:s,label:i,value:u,disabled:c,checked:r,onChange:function(){return t({isChecked:!r})}}))})},function(e,t,n){"use strict";var l=n(43),r=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(r,null,wp.element.createElement(l.a,{props:t})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl,a=l.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,u=n.attributes,s=u.value,i=u.label,c=u.name,m=u.disabled;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:i,onChange:function(e){l({label:e}),l({value:t(e)})}}),wp.element.createElement(o,{label:__("Value","sv_gutenform"),value:t(s),onChange:function(e){return l({value:t(e)})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(c),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(a,{label:__("Disabled","sv_gutenform"),checked:m,onChange:function(){return l({disabled:!m})}}))}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.isChecked,l=t.value,r=t.name,o=t.label,a=t.disabled;return wp.element.createElement("fieldset",null,o?wp.element.createElement("label",{for:r+"-"+l},o):null,wp.element.createElement("input",{type:"checkbox",id:r+"-"+l,name:r,value:l,disabled:a,checked:n}))}},function(e,t,n){"use strict";var l=n(46),r=(n.n(l),n(47)),o=n(48),a=n(51),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-radio",{title:__("Radio","sv_gutenform"),description:__("A radio button for an option to select.","sv_gutenform"),icon:r.a,parent:["straightvisions/sv-gutenform"],category:"straightvisions",keywords:[__("SV Gutenform Radio","sv_gutenform"),__("Radio Button","sv_gutenform"),__("Radio","sv_gutenform")],supports:{align:["left","right","center"]},attributes:{isChecked:{type:"boolean",default:!1},value:{type:"string"},label:{type:"string",default:__("Text Label","sv_gutenform")},name:{type:"string"},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c3.314 0 6-2.687 6-6s-2.686-6-6-6z"}))},function(e,t,n){"use strict";var l=n(49),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.components.TextControl;t.a=r(function(e,t){return t})(function(e){var t=(e.className,e.setAttributes,e.attributes),n=(t.isChecked,t.value),r=t.name,u=t.label,s=t.disabled;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{type:"radio",name:r,label:u,value:n,disabled:s}))})},function(e,t,n){"use strict";var l=n(50),r=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(r,null,wp.element.createElement(l.a,{props:t})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl,a=l.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,u=n.attributes,s=u.value,i=u.label,c=u.name,m=u.disabled;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:i,onChange:function(e){l({label:e}),l({value:t(e)})}}),wp.element.createElement(o,{label:__("Value","sv_gutenform"),value:t(s),onChange:function(e){return l({value:t(e)})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(c),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(a,{label:__("Disabled","sv_gutenform"),checked:m,onChange:function(){return l({disabled:!m})}}))}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.isChecked,l=t.value,r=t.name,o=t.label,a=t.disabled;return wp.element.createElement("fieldset",null,o?wp.element.createElement("label",{for:r+"-"+l},o):null,wp.element.createElement("input",{type:"radio",id:r+"-"+l,name:r,value:l,disabled:a,checked:n}))}},function(e,t,n){"use strict";var l=n(53),r=(n.n(l),n(54)),o=n(55),a=n(59),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-textarea",{title:__("Textarea","sv_gutenform"),description:__("An textarea for longer messages.","sv_gutenform"),icon:r.a,parent:["straightvisions/sv-gutenform"],category:"straightvisions",keywords:[__("SV Gutenform Textarea","sv_gutenform"),__("Textarea","sv_gutenform"),__("Textarea Field","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("Textarea Label","sv_gutenform")},placeholder:{type:"string",default:__("Message","sv_gutenform")},name:{type:"string"},disabled:{type:"boolean",default:!1},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M22 3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981zm-5 6h-14v-1h14v1zm0 2h-14v1h14v-1zm-6 3h-8v1h8v-1z"}))},function(e,t,n){"use strict";var l=n(56),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.blockEditor.RichText,u=wp.components,s=u.BaseControl,i=u.Disabled;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,r=e.attributes,u=r.defaultValue,c=r.name,m=r.placeholder,p=r.label,g=r.disabled,f=r.textColor,d=r.textColorClass,v=r.backgroundColor,b=r.backgroundColorClass,h=wp.element.createElement(s,{id:c,label:p},wp.element.createElement(a,{value:u,placeholder:m,keepPlaceholderOnFocus:!0,className:[d,b,t],style:{color:f,backgroundColor:v},onChange:function(e){return n({defaultValue:e})}}));return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),function(){return g?wp.element.createElement(i,null,h):h}())})},function(e,t,n){"use strict";var l=n(57),r=n(58),o=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(o,null,wp.element.createElement(l.a,{props:t}),wp.element.createElement(r.a,{props:t})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl,a=l.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,u=n.attributes,s=u.label,i=u.placeholder,c=u.name,m=u.disabled;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:s,onChange:function(e){l({label:e}),l({name:t(e)})}}),wp.element.createElement(o,{label:__("Placeholder","sv_gutenform"),value:i,onChange:function(e){return l({placeholder:e})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(c),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(a,{label:__("Disabled","sv_gutenform"),checked:m,onChange:function(){return l({disabled:!m})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,s=l.attributes,i=s.textColor,c=s.backgroundColor,m=[{value:i,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=e.className,l=t.defaultValue,r=t.name,o=t.placeholder,a=t.label,u=t.disabled,s=t.textColor,i=t.textColorClass,c=t.backgroundColor,m=t.backgroundColorClass,p="";return i&&(p+=i+" "),m&&(p+=m),wp.element.createElement("fieldset",{className:n},a?wp.element.createElement("label",{for:r},a):null,wp.element.createElement("textarea",{id:r,name:r,value:l,placeholder:o,class:p,style:{color:i?null:s,backgroundColor:m?null:c},disabled:u}))}},function(e,t,n){"use strict";var l=n(61),r=(n.n(l),n(62)),o=n(63),a=n(66),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-submit",{title:__("Submit Button","sv_gutenform"),description:__("The submit button for the form.","sv_gutenform"),icon:r.a,parent:["straightvisions/sv-gutenform"],category:"straightvisions",keywords:[__("SV Gutenform Submit","sv_gutenform"),__("Submit","sv_gutenform"),__("Button","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{text:{type:"string",default:__("Submit","sv_gutenform")},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"}))},function(e,t,n){"use strict";var l=n(64),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.blockEditor.RichText;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.attributes,r=n.text,u=n.textColor,s=n.textColorClass,i=n.backgroundColor,c=n.backgroundColorClass;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{className:[s,c,t],style:{color:u,backgroundColor:i},value:r,onChange:function(e){return setAttributes({text:e})}}))})},function(e,t,n){"use strict";var l=n(65),r=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(r,null,wp.element.createElement(l.a,{props:t})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,s=l.attributes,i=s.textColor,c=s.backgroundColor,m=[{value:i,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.text,l=t.textColor,r=t.textColorClass,o=t.backgroundColor,a=t.backgroundColorClass;return wp.element.createElement("button",{className:[r,a],style:{color:r?null:l,backgroundColor:a?null:o},type:"submit"},n)}}]);