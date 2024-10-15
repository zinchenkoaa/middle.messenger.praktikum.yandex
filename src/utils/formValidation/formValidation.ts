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

const checkLoginValidaty = (value: string = ""): ResultObject => {
    const rules: Rules = {
        symbols: "!@_.",
        minLength: 4,
        maxLength: 255
    };
    rules.pattern = new RegExp(`^[0-9a-zA-Z${rules.symbols}]{${rules.minLength},${rules.maxLength}}$`, "g");

    const checkList: Array<string | boolean> = [
        checkPattern(value, rules.pattern, `Поле может содержать только буквы латинского алфавита, цифры и символы ${rules.symbols}`),
        checkMaxLength(value.length, rules.maxLength),
        checkMinLength(value.length, rules.minLength)
    ];

    return checker(checkList);
};

const checkEmailValidaty = (value: string = ""): ResultObject => {
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

const checkNameValidaty = (value: string = ""): ResultObject => {
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

const checkPhoneValidaty = (value: string = ""): ResultObject => {
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
