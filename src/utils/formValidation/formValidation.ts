interface Rules {
    symbols: string;
    minLength: number;
    maxLength: number;
    pattern?: RegExp;
}

interface ResultObject {
    isValid: boolean,
    errorMessage: string | null
}

export const checkAllForm = (form: HTMLFormElement): boolean => {
    const inputs = form.querySelectorAll("input");
    const results: boolean[] = [];
    inputs.forEach(input => {
        results.push(checkFormInput(input).isValid);
    });

    return results.every(element => element === true);
};

const checkFormInput = (input: HTMLInputElement): ResultObject => {
    let result: ResultObject = {
        isValid: false,
        errorMessage: null
    };

    if (input) {
        const validationType = input.getAttribute("data-validation-type");
        const type = validationType ?? "text";
        const value = input.value;

        if (type != null) {
        switch (type) {
            case ("password"):
            result = checkPasswordValidaty(value);
            applyResult(input, result);
            break;
            case "login":
            result = checkLoginValidaty(value);
            applyResult(input, result);
            break;
            case "email":
            result = checkEmailValidaty(value);
            applyResult(input, result);
            break;
            case "name":
            result = checkNameValidaty(value);
            applyResult(input, result);
            break;
            case "phone":
            result = checkPhoneValidaty(value);
            applyResult(input, result);
            break;
        }
        }
    }
    return result;
};

export const formValidation = (event: Event | null): void => {
    if (event != null) {
        const target = event.target as HTMLInputElement;

        checkFormInput(target);
    }
};

const renderErrorBlock = (target: HTMLElement, result: ResultObject): void => {
    const errorBlock = (target.parentNode as HTMLElement).querySelector(".error-message");

    if (errorBlock != null) {
        if (result.isValid === false) {
        errorBlock.classList.remove("hide");
        errorBlock.textContent = result.errorMessage;
        } else {
        errorBlock.classList.add("hide");
        errorBlock.textContent = "";
        }
    }
};

const toggleClass = (target: HTMLElement, result: ResultObject): void => {
target.classList.add((result.isValid) ? "valid" : "invalid");
};

const applyResult = (target: HTMLElement, result: ResultObject): void => {
    renderErrorBlock(target, result);
    toggleClass(target, result);

};

const checkMaxLength = (length: number, maxLength: number): string | false => {
return (length > maxLength) ? `Поле может быть не более ${maxLength} символов` : false;
};

const checkMinLength = (length: number, minLength: number): string | false => {
return (length < minLength) ? `Поле должно быть длинее ${minLength} символов` : false;
};


const checkHasNumber = (value: string): string | false => {
const pattern = /(?=.*[0-9])/g;
return (!pattern.test(value)) ? "Поле должно содержать хотя бы 1 цифру" : false;
};

const checkHasSymbol = (value: string, symbols: string): string | false => {
const pattern = new RegExp(`(?=.*[${symbols}])`, "g");
return (!pattern.test(value)) ? `Поле должно содержать хотя бы 1 символ ${symbols}` : false;
};

const checkHasUppercase = (value: string): string | false => {
const pattern = /(?=.*[A-Z])/g;
return (!pattern.test(value)) ? "Поле должно содержать хотя бы 1 заглавную латинскую букву" : false;
};

const checkPattern = (value: string, pattern: RegExp, errorMessage = "Поле заполнено некорректно"): string | false => {
    return (!pattern.test(value)) ? errorMessage : false;
};

const checker = (checkResults: Array<string | boolean>): ResultObject => {
    const res = checkResults.find(res => (res));

    return ((res != null))
        ? {
        isValid: false,
        errorMessage: res
        } as ResultObject
        : {
        isValid: true,
        errorMessage: null
        } as ResultObject;
};

export const checkPasswordValidaty = (value: string = ""): ResultObject => {
    const rules: Rules = {
        symbols: "!@#%&",
        minLength: 6,
        maxLength: 10
    };

    rules.pattern = new RegExp(`^[0-9a-zA-Z${rules.symbols}]{${rules.minLength},${rules.maxLength}}$`, "g");

    const checkList: Array<string | boolean> = [
        checkMaxLength(value.length, rules.maxLength),
        checkMinLength(value.length, rules.minLength),
        checkHasNumber(value),
        checkHasSymbol(value, rules.symbols),
        checkHasUppercase(value),
        checkPattern(value, rules.pattern, `Поле может содержать только буквы латинского алфавита, цифры и символы ${rules.symbols}`)
    ];

    return checker(checkList);
};

export const checkLoginValidaty = (value: string = ""): ResultObject => {
    const rules: Rules = {
        symbols: "!@_.",
        minLength: 4,
        maxLength: 255
    };
    rules.pattern = new RegExp(`^[0-9a-zA-Z${rules.symbols}]{${rules.minLength},${rules.maxLength}}$`, "g");

    const checkList: Array<string | boolean> = [
        checkPattern(value, rules.pattern, `Поле может содержать только буквы латинского алфавита,<br/> цифры и символы ${rules.symbols}`),
        checkMaxLength(value.length, rules.maxLength),
        checkMinLength(value.length, rules.minLength)
    ];

    return checker(checkList);
};

export const checkEmailValidaty = (value: string = ""): ResultObject => {
    const rules: Rules = {
        symbols: "",
        minLength: 5,
        maxLength: 25
    };
    rules.pattern = /^[A-Za-z0-9._%+-]{1,}@[A-Za-z0-9-]{1,}\.[A-Za-z]{2,4}$/g;

    const checkList: Array<string | boolean> = [
        checkPattern(value, rules.pattern, "Ошибка в электронной почте"),
        checkMaxLength(value.length, rules.maxLength),
        checkMinLength(value.length, rules.minLength)
    ];

    return checker(checkList);
};

export const checkNameValidaty = (value: string = ""): ResultObject => {
    const rules: Rules = {
        symbols: "",
        minLength: 2,
        maxLength: 25
    };
    rules.pattern = /^[A-Zа-яё]{1,}$/gi;

    const checkList: Array<string | boolean> = [
        checkPattern(value, rules.pattern, "Поле может содержать только буквы латинского или русского алфавита"),
        checkMaxLength(value.length, rules.maxLength),
        checkMinLength(value.length, rules.minLength)
    ];

    return checker(checkList);
};

export const checkPhoneValidaty = (value: string = ""): ResultObject => {
    const rules: Rules = {
        symbols: "",
        minLength: 10,
        maxLength: 50
    };
    rules.pattern = /^[0-9-+\s()]{1,}$/gi;

    const checkList: Array<string | boolean> = [
        checkPattern(value, rules.pattern, "Неверный номер телефона"),
        checkMaxLength(value.length, rules.maxLength),
        checkMinLength(value.length, rules.minLength)
    ];

    return checker(checkList);
};

export const formValidationNew = (validationRules: ValidationRules) => {
    return (name: string, value: string): string | null => {
        const fieldRules = validationRules[name];

        if (!fieldRules || !Array.isArray(fieldRules)) {
            console.warn(`No validation rules found for field: "${name}"`);
            return null;
        }

        const invalidRule = fieldRules.find((rule) => !rule.validate(value));

        return invalidRule ? invalidRule.message : null;
    };
};

export const validationRules = {
    email: [
        {
            validate: (value: string) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
            message: 'Введите корректный email. Пример: user@example.com',
        },
    ],
    first_name: [
        {
            validate: (value: string) => /^[А-ЯЁA-Z][а-яёa-zА-ЯЁA-Z-]+$/.test(value),
            message: 'Имя должно начинаться с заглавной буквы и содержать только буквы.',
        },
        {
            validate: (value: string) => value.length >= 2,
            message: 'Имя должно содержать минимум 2 символа.',
        },
    ],
    second_name: [
        {
            validate: (value: string) => /^[А-ЯЁA-Z][а-яёa-zА-ЯЁA-Z-]+$/.test(value),
            message: 'Фамилия должна начинаться с заглавной буквы и содержать только буквы.',
        },
        {
            validate: (value: string) => value.length >= 2,
            message: 'Фамилия должна содержать минимум 2 символа.',
        },
    ],
    login: [
        {
            validate: (value: string) => /^[a-zA-Z0-9_-]{3,20}$/.test(value),
            message: 'Логин может содержать от 3 до 20 символов: латиницу, цифры, дефис, подчёркивание.',
        },
        {
            validate: (value: string) => /[a-zA-Z]/.test(value),
            message: 'Логин должен содержать хотя бы одну букву.',
        },
    ],
    password: [
        {
            validate: (value: string) => /^.{6,10}$/.test(value),
            message: 'Пароль должен быть длиной от 6 до 10 символов.',
        },
        {
            validate: (value: string) => /[A-Z]/.test(value),
            message: 'Пароль должен содержать хотя бы одну заглавную букву.',
        },
        {
            validate: (value: string) => /\d/.test(value),
            message: 'Пароль должен содержать хотя бы одну цифру.',
        },
    ],
    oldPassword: [
        {
            validate: (value: string) => value.length >= 8 && value.length <= 10,
            message: 'Пароль должен быть длиной от 6 до 10 символов.',
        },
        {
            validate: (value: string) => /[A-Z]/.test(value),
            message: 'Пароль должен содержать хотя бы одну заглавную букву.',
        },
        {
            validate: (value: string) => /\d/.test(value),
            message: 'Пароль должен содержать хотя бы одну цифру.',
        }
    ],
    newPassword: [
        {
            validate: (value: string) => value.length >= 6 && value.length <= 10,
            message: 'Пароль должен быть длиной от 6 до 10 символов.',
        },
        {
            validate: (value: string) => /[A-Z]/.test(value),
            message: 'Пароль должен содержать хотя бы одну заглавную букву.',
        },
        {
            validate: (value: string) => /\d/.test(value),
            message: 'Пароль должен содержать хотя бы одну цифру.',
        }
    ],
    phone: [
        {
            validate: (value: string) => /^[+]?[0-9]{10,15}$/.test(value),
            message: 'Телефон должен содержать от 10 до 15 цифр и может начинаться с "+".',
        },
    ],
    message: [
        {
            validate: (value: string) => value.trim().length > 0,
            message: 'Сообщение не должно быть пустым.',
        },
    ],
};
