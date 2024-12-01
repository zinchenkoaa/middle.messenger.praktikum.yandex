export const formValidation = (validationRules: ValidationRules) => {
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
