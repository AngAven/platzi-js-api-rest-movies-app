const defaultStyles = 'color: white;';

function createMessagesPrinter(type, styles) {
    message = (str) => console.log(`%c ${type}: ${str}`, defaultStyles + styles);

    return {
        message
    }
}

const error = createMessagesPrinter('Error', 'background: red;');
const warning = createMessagesPrinter('Warning', 'background: orange; ');
const success = createMessagesPrinter('Success', 'background: green; ');
const info = createMessagesPrinter('Info', 'background: blue; ');
const js = createMessagesPrinter('JS', 'background: yellow; color: black;');

error.message('fail message')
warning.message('warning message')
success.message('success message')
info.message('info message')
js.message('js message')