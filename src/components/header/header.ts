import Handlebars from "handlebars";

const headerHtml = `
  {{{ content }}}
`;

interface HeaderProps {
  tag: string;
  className: string;
  title: string;
}

export function Header({tag, className, title}: HeaderProps) {
  const tmpl = Handlebars.compile(headerHtml);

  const content = `<${tag} class="${className}">${title}</${tag}>`;

  const context = {
    className,
    content
  }

  return tmpl(context);
}