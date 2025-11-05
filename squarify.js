var style = document.createElement('style');
document.head.appendChild(style);

style.sheet.insertRule('* {border-radius: 0px !important;}');
style.sheet.insertRule('*::before {border-radius: 0px !important;}');
style.sheet.insertRule('*::after {border-radius: 0px !important;}');
