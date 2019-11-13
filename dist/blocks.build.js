!function(e){function t(l){if(n[l])return n[l].exports;var r=n[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1),n(7),n(16),n(26)},function(e,t,n){"use strict";var l=n(2),r=(n.n(l),n(3)),o=n(4),__=wp.i18n.__,a=wp.blocks.registerBlockType,u=wp.blockEditor.InnerBlocks;a("straightvisions/sv-gutenform",{title:__("SV Gutenform","sv_gutenform"),description:__("Create a form.","sv_gutenform"),icon:r.a,category:"straightvisions",keywords:[__("SV Gutenform","sv_gutenform"),__("Form","sv_gutenform"),__("Contact Form","sv_gutenform")],supports:{align:["wide","full"]},attributes:{adminMail:{type:"string",default:"disabled"},adminMailUser:{type:"number"},adminMailCustom:{type:"string"},confirmationMail:{type:"boolean",default:!1},confirmationMailContent:{type:"string"},className:{type:"string"}},edit:o.a,save:function(){return wp.element.createElement(u.Content,null)}})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M13 17h4v1h-4v-1zm0-1h4v-1h-4v1zm9-14v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-7 9h4v-1h-4v1zm0-2h4v-1h-4v1zm-6.5.077l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.288c-.963.841-1.669 1.777-2.686 3.6-.626-.738-1.044-1.208-1.814-1.923zm.098 5l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.289c-.963.841-1.669 1.777-2.686 3.6-.627-.739-1.045-1.209-1.814-1.924z"}))},function(e,t,n){"use strict";var l=n(5),__=wp.i18n.__,r=wp.data.withSelect,o=wp.element.Fragment,a=wp.blockEditor.InnerBlocks,u=[["core/heading",{content:__("Contact","sv_gutenform"),level:3}]];t.a=r(function(e,t){return{props:t,data:{authors:(0,e("core").getAuthors)()}}})(function(e){var t=e.props,n=e.data,r=t.className;return wp.element.createElement(o,{className:r},wp.element.createElement(l.a,{props:t,data:n}),wp.element.createElement("form",{method:"POST",className:r},wp.element.createElement(a,{template:u,templateLock:!1})))})},function(e,t,n){"use strict";var l=n(6),r=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props,n=e.data;return t&&n?wp.element.createElement(r,null,wp.element.createElement(l.a,{props:t,data:n})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.compose.withState,r=(wp.blockEditor.RichText,wp.components),o=r.PanelBody,a=r.Button,u=r.Modal,i=r.TextControl,s=(r.RadioControl,r.SelectControl),c=r.ToggleControl;t.a=function(e){var t=e.props,n=e.data;if(!t||!n)return"";var r=t.setAttributes,m=t.attributes,p=m.adminMail,g=m.adminMailUser,f=m.adminMailCustom,d=m.confirmationMail,v=(m.confirmationMailContent,l({isOpen:!1})(function(e){var t=e.isOpen,n=e.setState;return wp.element.createElement("div",null,wp.element.createElement(a,{isDefault:!0,onClick:function(){return n({isOpen:!0})}},__("Edit Mail Content","sv_gutenform")),t&&wp.element.createElement(u,{title:"This is my modal",onRequestClose:function(){return n({isOpen:!1})},shouldCloseOnEsc:!1},wp.element.createElement(a,{isPrimary:!0,onClick:function(){return n({isOpen:!1})}},__("Save & Close","sv_gutenform"))))}));return wp.element.createElement(o,{title:__("Form Settings","sv_gutenform"),initialOpen:!1},wp.element.createElement(s,{label:__("Admin Mail","sv_gutenform"),value:p,options:[{label:"Disabled",value:"disabled"},{label:"Send to Author",value:"author"},{label:"Send to Mail",value:"custom"}],onChange:function(e){r({adminMail:e})}}),"author"===p?wp.element.createElement(s,{label:__("Author","sv_gutenform"),value:g,options:function(){var e=[];return n.authors.map(function(t){e.push({label:t.name,value:t.id})}),e}(),onChange:function(e){r({adminMailUser:e})}}):null,"custom"===p?wp.element.createElement(i,{label:__("E-Mail","sv_gutenform"),type:"email",value:f,onChange:function(e){r({adminMailCustom:e})}}):null,wp.element.createElement(c,{label:__("Confirmation Mail","sv_gutenform"),checked:d,onChange:function(){return r({confirmationMail:!d})}}),d?wp.element.createElement(v,null):null)}},function(e,t,n){"use strict";var l=n(8),r=(n.n(l),n(9)),o=n(10),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-text",{title:__("Text","sv_gutenform"),description:__("A field for short texts.","sv_gutenform"),icon:r.a,category:"straightvisions",keywords:[__("SV Gutenform Text","sv_gutenform"),__("Text Input","sv_gutenform"),__("Text","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("Text Label","sv_gutenform")},name:{type:"string"},placeholder:{type:"string",default:__("Text","sv_gutenform")},required:{type:"boolean",default:!1},minlength:{type:"number",default:0},maxlength:{type:"number",default:0},labelColor:{type:"string"},labelColorClass:{type:"string"},inputColor:{type:"string"},inputColorClass:{type:"string"},inputBackgroundColor:{type:"string"},inputBackgroundColorClass:{type:"string"},autofocus:{type:"boolean",default:!1},autocomplete:{type:"boolean",default:!1},readonly:{type:"boolean",default:!1},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:o.a,save:function(){return null}})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z"}))},function(e,t,n){"use strict";var l=n(11),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.components.TextControl;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,r=e.attributes,u=r.defaultValue,i=r.label,s=r.name,c=r.placeholder,m=r.required,p=r.minlength,g=r.maxlength,f=r.labelColor,d=r.labelColorClass,v=r.inputColor,h=r.inputColorClass,b=r.inputBackgroundColor,w=r.inputBackgroundColorClass,C=r.autofocus,E=r.autocomplete,_=r.readonly,y=r.disabled;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement("div",{className:t},i.length>0?wp.element.createElement("label",{for:s,style:{color:f},className:d},i):null,wp.element.createElement(a,{type:"text",name:s,label:i,required:m,disabled:y,readonly:_,value:u,minlength:p>0?p:-1,maxlength:g>0?g:-1,autofocus:C,placeholder:c,autocomplete:E,style:{color:v,backgroundColor:b},className:[h,w],onChange:function(e){return n({defaultValue:e})},hideLabelFromVision:!0})))})},function(e,t,n){"use strict";var l=n(12),r=n(13),o=n(14),a=n(15),u=wp.element.Fragment,i=wp.blockEditor,s=i.InspectorControls,c=i.InspectorAdvancedControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(u,null,wp.element.createElement(s,null,wp.element.createElement(l.a,{props:t}),wp.element.createElement(r.a,{props:t}),wp.element.createElement(a.a,{props:t})),wp.element.createElement(c,null,wp.element.createElement(o.a,{props:t}))):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,a=n.attributes,u=a.label,i=a.placeholder,s=a.name;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:u,onChange:function(e){l({label:e}),l({name:t(e)})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(s),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(o,{label:__("Placeholder","sv_gutenform"),value:i,onChange:function(e){return l({placeholder:e})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.RangeControl,a=l.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,l=t.attributes,u=l.required,i=l.minlength,s=l.maxlength;return wp.element.createElement(r,{title:__("Validation Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(a,{label:__("Required","sv_gutenform"),checked:u,onChange:function(){return n({required:!u})}}),wp.element.createElement(o,{label:__("Min. Length","sv_gutenform"),help:__("Defines the min. character length.","sv_gutenform"),value:i,onChange:function(e){return n({minlength:e})},min:0,max:50}),wp.element.createElement(o,{label:__("Max. Length","sv_gutenform"),help:__("Defines the max. character length.","sv_gutenform"),value:s,onChange:function(e){return n({maxlength:e})},min:0,max:50}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.element.Fragment,r=wp.components.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,o=t.attributes,a=o.autofocus,u=o.autocomplete,i=o.readonly,s=o.disabled;return wp.element.createElement(l,null,wp.element.createElement(r,{label:__("Autofocus","sv_gutenform"),checked:a,onChange:function(){return n({autofocus:!a})}}),wp.element.createElement(r,{label:__("Autocomplete","sv_gutenform"),checked:u,onChange:function(){return n({autocomplete:!u})}}),wp.element.createElement(r,{label:__("Read Only","sv_gutenform"),checked:i,onChange:function(){return n({readonly:!i})}}),wp.element.createElement(r,{label:__("Disabled","sv_gutenform"),checked:s,onChange:function(){return n({disabled:!s})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,i=l.attributes,s=i.labelColor,c=i.inputColor,m=i.inputBackgroundColor,p=[{value:s,onChange:function(e){u({labelColor:e}),u({labelColorClass:n(e)})},label:__("Label","sv_gutenform")},{value:c,onChange:function(e){u({inputColor:e}),u({inputColorClass:n(e)})},label:__("Input","sv_gutenform")},{value:m,onChange:function(e){u({inputBackgroundColor:e}),u({inputBackgroundColorClass:n(e,"background-color")})},label:__("Input Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:p})}},function(e,t,n){"use strict";var l=n(17),r=(n.n(l),n(18)),o=n(19),a=n(25),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-email",{title:__("E-Mail","sv_gutenform"),description:__("A field for an e-mail adress.","sv_gutenform"),icon:r.a,category:"straightvisions",keywords:[__("SV Gutenform E-Mail","sv_gutenform"),__("E-Mail Input","sv_gutenform"),__("E-Mail","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{defaultValue:{type:"string"},label:{type:"string",default:__("E-Mail Label","sv_gutenform")},name:{type:"string"},placeholder:{type:"string",default:__("E-Mail","sv_gutenform")},required:{type:"boolean",default:!1},minlength:{type:"number",default:0},maxlength:{type:"number",default:0},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},autofocus:{type:"boolean",default:!1},autocomplete:{type:"boolean",default:!1},readonly:{type:"boolean",default:!1},disabled:{type:"boolean",default:!1},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"}))},function(e,t,n){"use strict";var l=n(20),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.components.TextControl;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.setAttributes,r=e.attributes,u=r.defaultValue,i=r.name,s=r.placeholder,c=r.label,m=r.required,p=r.minlength,g=r.maxlength,f=r.textColor,d=r.textColorClass,v=r.backgroundColor,h=r.backgroundColorClass,b=r.autofocus,w=r.autocomplete,C=r.readonly,E=r.disabled;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{type:"email",name:i,label:c,required:m,disabled:E,readonly:C,value:u,minlength:p,maxlength:g,autofocus:b,placeholder:s,autocomplete:w,style:{color:f,backgroundColor:v},className:[d,h,t],onChange:function(e){return n({defaultValue:e})}}))})},function(e,t,n){"use strict";var l=n(21),r=n(22),o=n(23),a=n(24),u=wp.element.Fragment,i=wp.blockEditor,s=i.InspectorControls,c=i.InspectorAdvancedControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(u,null,wp.element.createElement(s,null,wp.element.createElement(l.a,{props:t}),wp.element.createElement(r.a,{props:t}),wp.element.createElement(a.a,{props:t})),wp.element.createElement(c,null,wp.element.createElement(o.a,{props:t}))):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.TextControl;l.ToggleControl;t.a=function(e){function t(e){return e?e.replace(/[^A-Z0-9]+/gi,"-").toLowerCase():""}var n=e.props;if(!n)return"";var l=n.setAttributes,a=n.attributes,u=a.label,i=a.placeholder,s=a.name;return wp.element.createElement(r,{title:__("Input Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(o,{label:__("Label","sv_gutenform"),value:u,onChange:function(e){l({label:e}),l({name:t(e)})}}),wp.element.createElement(o,{label:__("Name","sv_gutenform"),value:t(s),onChange:function(e){return l({name:t(e)})}}),wp.element.createElement(o,{label:__("Placeholder","sv_gutenform"),value:i,onChange:function(e){return l({placeholder:e})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.components,r=l.PanelBody,o=l.RangeControl,a=l.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,l=t.attributes,u=l.required,i=l.minlength,s=l.maxlength;return wp.element.createElement(r,{title:__("Validation Settings","sv_gutenform"),initialOpen:!0},wp.element.createElement(a,{label:__("Required","sv_gutenform"),checked:u,onChange:function(){return n({required:!u})}}),wp.element.createElement(o,{label:__("Min. Length","sv_gutenform"),help:__("Defines the min. character length.","sv_gutenform"),value:i,onChange:function(e){return n({minlength:e})},min:0,max:50}),wp.element.createElement(o,{label:__("Max. Length","sv_gutenform"),help:__("Defines the max. character length.","sv_gutenform"),value:s,onChange:function(e){return n({maxlength:e})},min:0,max:50}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.element.Fragment,r=wp.components.ToggleControl;t.a=function(e){var t=e.props;if(!t)return"";var n=t.setAttributes,o=t.attributes,a=o.autofocus,u=o.autocomplete,i=o.readonly,s=o.disabled;return wp.element.createElement(l,null,wp.element.createElement(r,{label:__("Autofocus","sv_gutenform"),checked:a,onChange:function(){return n({autofocus:!a})}}),wp.element.createElement(r,{label:__("Autocomplete","sv_gutenform"),checked:u,onChange:function(){return n({autocomplete:!u})}}),wp.element.createElement(r,{label:__("Read Only","sv_gutenform"),checked:i,onChange:function(){return n({readonly:!i})}}),wp.element.createElement(r,{label:__("Disabled","sv_gutenform"),checked:s,onChange:function(){return n({disabled:!s})}}))}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,i=l.attributes,s=i.textColor,c=i.backgroundColor,m=[{value:s,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.defaultValue,l=t.name,r=t.placeholder,o=t.label,a=t.disabled,u=t.textColor,i=t.textColorClass,s=t.backgroundColor,c=t.backgroundColorClass;return wp.element.createElement("fieldset",null,o?wp.element.createElement("label",{for:l},o):null,wp.element.createElement("input",{type:"email",id:l,name:l,value:n,placeholder:r,className:[i,c],style:{color:i?null:u,backgroundColor:c?null:s},disabled:a}))}},function(e,t,n){"use strict";var l=n(27),r=(n.n(l),n(28)),o=n(29),a=n(32),__=wp.i18n.__;(0,wp.blocks.registerBlockType)("straightvisions/sv-gutenform-submit",{title:__("Submit Button","sv_gutenform"),description:__("The submit button for the form.","sv_gutenform"),icon:r.a,category:"straightvisions",keywords:[__("SV Gutenform Submit","sv_gutenform"),__("Submit","sv_gutenform"),__("Button","sv_gutenform")],supports:{align:["left","right","center","wide","full"]},attributes:{text:{type:"string",default:__("Submit","sv_gutenform")},textColor:{type:"string"},textColorClass:{type:"string"},backgroundColor:{type:"string"},backgroundColorClass:{type:"string"},className:{type:"string"}},edit:o.a,save:a.a})},function(e,t){},function(e,t,n){"use strict";t.a=wp.element.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},wp.element.createElement("path",{d:"M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"}))},function(e,t,n){"use strict";var l=n(30),r=wp.data.withSelect,o=wp.element.Fragment,a=wp.blockEditor.RichText;t.a=r(function(e,t){return t})(function(e){var t=e.className,n=e.attributes,r=n.text,u=n.textColor,i=n.textColorClass,s=n.backgroundColor,c=n.backgroundColorClass;return wp.element.createElement(o,null,wp.element.createElement(l.a,{props:e}),wp.element.createElement(a,{className:[i,c,t],style:{color:u,backgroundColor:s},value:r,onChange:function(e){return setAttributes({text:e})}}))})},function(e,t,n){"use strict";var l=n(31),r=wp.blockEditor.InspectorControls;t.a=function(e){var t=e.props;return t?wp.element.createElement(r,null,wp.element.createElement(l.a,{props:t})):""}},function(e,t,n){"use strict";var __=wp.i18n.__,l=wp.blockEditor,r=l.PanelColorSettings,o=l.getColorObjectByColorValue,a=l.getColorClassName;t.a=function(e){function t(e){var t=wp.data.select("core/editor").getEditorSettings();return o(t.colors,e)}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"color";return e&&t(e)?a(n,t(e).slug):""}var l=e.props;if(!l)return"";var u=l.setAttributes,i=l.attributes,s=i.textColor,c=i.backgroundColor,m=[{value:s,onChange:function(e){u({textColor:e}),u({textColorClass:n(e)})},label:__("Text","sv_gutenform")},{value:c,onChange:function(e){u({backgroundColor:e}),u({backgroundColorClass:n(e,"background-color")})},label:__("Background","sv_gutenform")}];return wp.element.createElement(r,{title:__("Color Settings","sv_gutenform"),initialOpen:!1,colorSettings:m})}},function(e,t,n){"use strict";t.a=function(e){var t=e.attributes,n=t.text,l=t.textColor,r=t.textColorClass,o=t.backgroundColor,a=t.backgroundColorClass;return wp.element.createElement("button",{className:[r,a],style:{color:r?null:l,backgroundColor:a?null:o},type:"submit"},n)}}]);