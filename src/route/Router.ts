import Route from './Route';
import { Block } from "../utils/block";


type BlockConstructor = new () => Block;

type Middleware = () => boolean | Promise<boolean>;

interface RouteWithMiddleware {
    route: Route;
    middleware?: Middleware;
}

export default class Router {

    protected routes: RouteWithMiddleware[];

    protected history: History;

    protected _currentRoute: Route | null;

    protected _rootQuery: string;

    private static __instance: Router | null = null;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname:string, block: BlockConstructor, middleware?: Middleware): this {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push({ route, middleware});
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent): void => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname); // Обработка текущего маршрута
        };

        // Обработка маршрута при загрузке страницы
        this._onRoute(window.location.pathname);
    }

    async _onRoute(pathname: string): Promise<void> {
        const routeData = this.getRoute(pathname);

        if (!routeData) {
            console.error(`Route not found for pathname: ${pathname}`);
            const notFoundRoute = this.getRoute('/404');
            if (notFoundRoute) {
                this._currentRoute = notFoundRoute.route;
                notFoundRoute.route.render();
            }
            return;
        }

        const { route, middleware } = routeData;

        if (middleware) {
            const result = middleware();
            const isAllowed = result instanceof Promise ? await result : result;

            if (!isAllowed) {
                return;
            }
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route || null;

        try {
            if (route) {
                route.render();
            }
        } catch (error) {
            console.error('Error during route rendering:', error);
            const errorRoute = this.getRoute('/500');
            if (errorRoute) {
                this._currentRoute = errorRoute.route;
                errorRoute.route.render();
            }
        }
    }

    go(pathname: string): void {
        if (this.history) {
            this.history.pushState({}, '', pathname);
        }
        this._onRoute(pathname);
    }

    back(): void {
            this.history.back();
            this._onRoute(window.location.pathname); // Перерендер маршрута
    }

    forward(): void {
        if (this.history) {
            this.history.forward();
        }

    }

    getRoute(pathname:string) {
        return this.routes.find(({route}) => route.match(pathname));
    }

    getCurrentPath(): string | undefined {
        if (this._currentRoute !== null) {
            return this._currentRoute.getPathname();
        }
    }
}
