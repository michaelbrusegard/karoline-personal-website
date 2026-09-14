import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      quoteStyle: 'single',
      semicolons: true,
    }),
    react({ compiler: true }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  lint: {
    ignorePatterns: ['dist/**', 'src/routeTree.gen.ts'],
    plugins: [
      'typescript',
      'oxc',
      'react',
      'react-perf',
      'jsx-a11y',
      'unicorn',
      'import',
      'promise',
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    env: {
      browser: true,
      es2024: true,
    },
    categories: {
      correctness: 'error',
      suspicious: 'error',
      perf: 'warn',
      pedantic: 'warn',
      style: 'warn',
    },
    rules: {
      // Base
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-nested-ternary': 'off',
      'no-plusplus': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'sort-keys': 'off',
      'sort-imports': 'off',
      'func-style': 'off',
      'no-magic-numbers': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'id-length': 'off',
      'no-negated-condition': 'off',
      'one-var': 'off',
      'sort-vars': 'off',
      'max-statements': 'off',
      'no-continue': 'off',
      'prefer-destructuring': 'off',
      'no-duplicate-imports': 'off',

      // TypeScript
      'typescript/no-explicit-any': 'error',
      'typescript/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'typescript/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'typescript/consistent-type-definitions': ['error', 'type'],
      'typescript/array-type': ['error', { default: 'array' }],
      'typescript/no-non-null-assertion': 'error',
      'typescript/no-floating-promises': 'error',
      'typescript/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      'typescript/switch-exhaustiveness-check': 'error',
      'typescript/no-unnecessary-condition': 'warn',
      'typescript/strict-boolean-expressions': 'off',
      'typescript/explicit-function-return-type': 'off',
      'typescript/explicit-module-boundary-types': 'off',
      'typescript/prefer-readonly-parameter-types': 'off',
      'typescript/no-magic-numbers': 'off',
      'typescript/parameter-properties': 'off',
      'typescript/no-unsafe-type-assertion': 'off',
      'typescript/consistent-return': 'off',

      // React
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
      'react/prefer-function-component': 'error',
      'react/only-export-components': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-literals': 'off',
      'react/jsx-max-depth': 'off',
      'react/no-multi-comp': 'off',
      'react/jsx-filename-extension': 'off',
      'react/forbid-component-props': 'off',
      'react/jsx-handler-names': 'off',
      'react/react-in-jsx-scope': 'off',

      // React perf: JSX/objects/functions as props are idiomatic with Base UI `render` and React Compiler
      'react-perf/jsx-no-jsx-as-prop': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',
      'react-perf/jsx-no-new-array-as-prop': 'off',

      // Jsx-a11y: Base UI's `render={<a />}` composition injects children later, so these misfire
      'jsx-a11y/anchor-has-content': 'off',
      'jsx-a11y/control-has-associated-label': 'off',

      // Unicorn
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-global-this': 'off',

      // Import
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/consistent-type-specifier-style': 'off',
      'import/no-default-export': 'off',
      'import/no-named-export': 'off',
      'import/prefer-default-export': 'off',
      'import/no-namespace': 'off',
      'import/no-unassigned-import': 'off',
      'import/exports-last': 'off',
      'import/group-exports': 'off',
      'import/max-dependencies': 'off',
      'import/no-anonymous-default-export': 'off',
    },
    overrides: [
      {
        files: ['vite.config.ts'],
        env: { node: true },
        rules: {
          'import/no-nodejs-modules': 'off',
        },
      },
      {
        // Generated by the shadcn CLI; keep diffs against upstream small
        files: ['src/components/ui/**'],
        rules: {
          'react/no-array-index-key': 'off',
          'jsx-a11y/prefer-tag-over-role': 'off',
          'jsx-a11y/label-has-associated-control': 'off',
          'typescript/no-unnecessary-condition': 'off',
        },
      },
    ],
  },
  fmt: {
    ignorePatterns: ['dist/**', 'src/routeTree.gen.ts', 'bun.lock'],
    printWidth: 100,
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'all',
    sortImports: {
      groups: [
        'side_effect',
        'side_effect_style',
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling', 'index'],
        'style',
        'type',
      ],
      internalPattern: ['@/'],
    },
    sortTailwindcss: {
      stylesheet: './src/styles/app.css',
      functions: ['cn', 'cva'],
    },
  },
});
