import "./style.css";
import { home } from "./pages/home";
import { profile } from "./pages/profile";
import { chat } from "./pages/chat";
import { error } from "./pages/error";


document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector("#root");

    if (root) {
        let inner: string = '';

        switch (document.location.pathname) {
            case "/":
                inner = home("login");
                break;

            case "/registration":
                inner = home("registration");
                break;

            case "/profile":
                inner = profile();
                break;

            case "/profile-edit":
                inner = profile("profileEdit");
                break;

            case "/password-edit":
                inner = profile("passwordEdit");
                break;

            case "/chat":
                inner = chat();
                break;

            case "/500":
                inner = error("500");
                break;

            default:
                inner = error("404");
                break;
        }
        
        root.innerHTML = inner;
    } else {
        console.error("Элемент с id 'root' не найден на странице.");
    }
})