function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const keys = path.split('.');
    const key = keys[0];

    if (keys.length === 1) {
        (object as Indexed)[key] = value;
        return object;
    }

    if (typeof (object as Indexed)[key] !== 'object' || (object as Indexed)[key] === null) {
        (object as Indexed)[key] = {};
    }
    set((object as Indexed)[key], keys.slice(1).join('.'), value);

    return object;
}

function get(object: Indexed | unknown, path: string): unknown {
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    if (typeof object !== 'object' || object === null) {
        return undefined;
    }

    if (path === '') {
        return object;
    }
    const keys = path.split('.');
    let result: unknown = object;
    for (const key of keys) {
        if (typeof result !== 'object' || result === null || !(key in result)) {
            return undefined;
        }
        result = (result as Indexed)[key];
    }
    return result;
}


function isEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {

    if (a === b) {
        return true;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length != keysB.length) {
        return false;
    }
    for (let i = 0; i < keysA.length; i += 1) {
        const keyA = keysA[i];
        const keyB = keysB[i];
        if (keyA != keyB) {
            return false;
        }
        const valueA = a[keyA];
        const valueB = b[keyB];
        if (typeof valueA === 'object'  && valueA !== null && typeof valueB === 'object' && valueB !== null) {
            if (!isEqual(valueA as Record<string, unknown> , valueB as Record<string, unknown>)) {
                return false;
            }
        } else {
            if (valueA != valueB) {
                return false;
            }
        }
    }
    return true;
}


function cloneDeep<T extends object = object>(obj: T) {
    const newObj: any = isArray(obj) ? [] : {};
    for(const [key, value] of Object.entries(obj)) {
        if (isArrayOrObject(value)) {
            newObj[key] = cloneDeep(value);
            continue;
        }
        newObj[key] = value;
    }
    return newObj as T;
}



function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isPlainObject(value: unknown): value is Indexed {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArrayOrObject(value: unknown): value is ([] | Indexed) {
    return isPlainObject(value) || isArray(value);
}
export { set, get, isEqual, cloneDeep };
