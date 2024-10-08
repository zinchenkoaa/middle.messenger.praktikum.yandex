import Handlebars from "handlebars";
import "./link.css";

const linkHtml = `<div class="link-wrapper"><a class="link" href="{{ href }}">{{ text }}</a></div>`;

interface LinkProps {
    href: string;
    text: string;
}

export function Link({
    href,
    text,
}: LinkProps) {
    const template = linkHtml;
    const tmpl = Handlebars.compile(template);
    const context = { href, text };

    return tmpl(context);
}
