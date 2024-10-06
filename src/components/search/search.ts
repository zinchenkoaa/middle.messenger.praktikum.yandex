import Handlebars from "handlebars";
import "./search.css";

const linkHtml = `
<div class="wrapper-search">
    <input type="search" placeholder={{ placeholder }}>
</div>
`;

interface SearchProps {
    placeholder: string;
}

export function Search({
    placeholder,
}: SearchProps) {
    const template = linkHtml;
    const tmpl = Handlebars.compile(template);
    const context = { placeholder };

    return tmpl(context);
}