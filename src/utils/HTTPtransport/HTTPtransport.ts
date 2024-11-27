enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

type Options = {
    timeout?: number;
    method?: METHODS;
    headers?: Record<string, string>;
    data?: any;
} & Record<string, unknown>;

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

export class HTTPTransport {
    get: HTTPMethod = (url, options = {}): Promise<XMLHttpRequest> => {
        const { data } = options;

        if (data) {
            url = (data) ? `${url}${this._queryStringify(data)}` : url;
            delete options.data;
        }

        return this.request(url, { ...options, method: METHODS.GET });
    };

    post: HTTPMethod = (url, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    put: HTTPMethod = (url, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    delete: HTTPMethod = (url, options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    private _queryStringify = (data: Record<string, any>): string => {
        if (typeof data !== "object" || data === null) {
            throw new Error("Data must be an object");
        }
    
        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(String(data[key]));
            return `${result}${encodedKey}=${encodedValue}${index < keys.length - 1 ? "&" : ""}`;
        }, "?");
    };

    request = (url: string, options: Options = { method: METHODS.GET }): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data, timeout } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                method as string,
                url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout ?? 5000;
            xhr.ontimeout = reject;

            if (!data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
