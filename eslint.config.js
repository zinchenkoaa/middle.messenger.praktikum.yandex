import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser'; // Импортируем парсер
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    ignores: ['node_modules/**', 'module/**'], // Исключаем папки node_modules и module из проверок
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser, // Используем парсер для TypeScript
      parserOptions: {
        project: './tsconfig.json', // Указываем путь к вашему tsconfig.json
        tsconfigRootDir: __dirname, // Указываем корневую директорию
        sourceType: 'module', // Используем модули ECMAScript
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    rules: {
      // Базовые правила для чистоты и поддерживаемости кода
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',

      // Безопасность и защита от уязвимостей
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // Стиль кода и читаемость
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // Оптимизация и производительность
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',

      // Модули и импорт
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      'sort-imports': ['error', {
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      }],
    },
  },
];
