import Handlebars from "handlebars";
import "./home.css";
import { login } from "../../modules/login";
import { registration } from "../../modules/registration";
import { Header } from "../../components/header/header";

const homeHtml = `
<div class="home">
    <div class="home-container">
        {{{ header }}}

        <form>
            {{{ content }}}
         </form>
    </div>
</div>
`;

export function home(inner = "login") {

    const tmpl = Handlebars.compile(homeHtml);
    let context = {};

    switch (inner) {
        case "registration":
            context = { header: Header({ tag: "h1", className: "home-header", title: "Регистрация"  }), content: registration };
            break;
        default:
            context = { header: Header({ tag: "h1", className: "home-header", title: "Вход"  }), content: login }
            break;
    }

    return tmpl(context);
}
