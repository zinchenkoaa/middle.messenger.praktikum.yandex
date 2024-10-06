import Handlebars from "handlebars";
import "./button.css";

const buttonHtml = `
<button class="{{ className }}">
    {{{ label }}}
</button>
`;

interface ButtonProps {
    label: string;
    className?: string
}

export function Button({ label, className = "button" }: ButtonProps) {

    const tmpl = Handlebars.compile(buttonHtml);
    const context = { label, className };

    return tmpl(context);
}