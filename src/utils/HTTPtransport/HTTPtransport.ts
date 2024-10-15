enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

type Options = {
    timeout?: number | undefined | unknown;
    method?: METHODS;
    headers?: Record<string, string>;
    data?: any;
} & Record<string, unknown>;

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
    get = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
        const { data } = options;

        if (data) {
            url = (data) ? `${url}${this._queryStringify(data)}` : url;
            delete options.data;
        }

        return this.request(url, { ...options, method: METHODS.GET }, options.timeout as number | undefined);
    };

    post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout as number | undefined);
    };

    put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout as number | undefined);
    };

    delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout as number | undefined);
    };

    private _queryStringify = (data: Record<string, any>): string => {
        if (typeof data !== "object") {
            throw new Error("Data must be object");
        }

        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
            return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
        }, "?");
    };

    request = (url: string, options: Options = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data } = options;

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

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (!data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
