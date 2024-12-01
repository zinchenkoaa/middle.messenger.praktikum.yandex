const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

type Methods = keyof typeof METHODS;

interface Options {
    method?: Methods;
    headers?: Record<string, string>;
    data?: Record<string, any> | FormData;
    timeout?: number;
}

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>

function queryStringify(data: Record<string, any>): string {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

function setHeaders(xhr: XMLHttpRequest, headers: Record<string, string>): void {
    Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
    });
}

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        const { method, headers = {}, data } = options;
        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method provided'));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;
            if (isGet && !!data) { console.log('query', queryStringify(data as Record<string, any>)) }

            xhr.open(
                method,
                isGet && !!data ? `${url}${queryStringify(data as Record<string, any>)}` : url
            );

            setHeaders(xhr, headers);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;

            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('mode', 'cors');
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport;
