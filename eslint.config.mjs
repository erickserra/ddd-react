import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'commitlint.config.js',
      '.lintstagedrc.js',
      'cz.config.js',
      'vite.config.ts',
      '@types/*',
      "src/lib/i18n/locales/*.json"
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: eslintPluginImport,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@mui/material',
            message:
              'Do not import directly from @mui/material. Import from @mui/material/<component> instead to enable tree-shaking.',
          },
        ],
      },
    ],

      /* naming */
      '@typescript-eslint/naming-convention': [
        'warn',

        /* interfaces start with I */
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },

        /* variables, parameters, props: camelCase or PascalCase */
        { selector: 'variableLike', format: ['camelCase', 'PascalCase'] },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
      ],

      /* warn console and debugger */
      'no-console': 'warn',
      'no-debugger': 'warn',

      /* prettier */
      'prettier/prettier': 'error',

      /* nest and ts specific cases */
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      /* import order and type consistency */
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // node built-ins: fs, path
            'external', // npm
            'internal', // project aliases
            ['sibling', 'parent'],
            'index',
          ],
          'newlines-between': 'always',
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      /* orderer object properties - removed, best to follow nest natural order */
      // 'sort-keys': ['warn', 'asc', { natural: true }],

      /* check https://typescript-eslint.io/rules/member-ordering/, this applies their default ordering */
      '@typescript-eslint/member-ordering': 'warn',
    },
  },
  {
    // test specific configs, we leave them be basically
    files: ['**/*.spec.{ts,tsx}', 'test/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);
