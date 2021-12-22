module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: ['prettier', 'plugin:import/errors'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import', 'jsdoc', 'prefer-arrow'],
  overrides: [
    {
      files: ['__tests__/**', '__mocks__/**', 'integration-test/**'],
      rules: {
        'max-lines-per-function': 'off',
        'import/no-internal-modules': 'off'
      }
    }
  ],
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array'
      }
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: 'Use {} instead.',
            fixWith: '{}'
          },
          String: {
            message: "Use 'string' instead.",
            fixWith: 'string'
          },
          Number: {
            message: "Use 'number' instead.",
            fixWith: 'number'
          },
          Boolean: {
            message: "Use 'boolean' instead.",
            fixWith: 'boolean'
          },
          Function: {
            message: "Use '(parameter: <P>, ...) => <T>' instead."
          },
          object: false,
          parseInt: {
            message: 'tsstyle#type-coercion'
          },
          parseFloat: {
            message: 'tsstyle#type-coercion'
          },
          Array: {
            message: 'tsstyle#array-constructor'
          }
        }
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      },
      {
        selector: 'method',
        modifiers: ['static'],
        format: ['UPPER_CASE']
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE']
      },
      {
        selector: 'enum',
        format: ['UPPER_CASE']
      },
      {
        selector: 'property',
        format: null
      }
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never'
      }
    ],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public'
        }
      }
    ],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: {
          memberTypes: [
            // Index signature
            'signature',

            // Fields
            'public-static-field',
            'protected-static-field',
            'private-static-field',

            // 'public-decorated-field',
            // 'protected-decorated-field',
            // 'private-decorated-field',

            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',

            'public-abstract-field',
            'protected-abstract-field',
            'private-abstract-field',

            'public-field',
            'protected-field',
            'private-field',

            'static-field',
            'instance-field',
            'abstract-field',

            // 'decorated-field',

            'field',

            // Constructors
            'public-constructor',
            'protected-constructor',
            'private-constructor',

            'constructor',

            // Methods
            'public-static-method',
            'protected-static-method',
            'private-static-method',

            'public-decorated-method',
            'protected-decorated-method',
            'private-decorated-method',

            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',

            'public-abstract-method',
            'protected-abstract-method',
            'private-abstract-method',

            'public-method',
            'protected-method',
            'private-method',

            'static-method',
            'instance-method',
            'abstract-method',

            'decorated-method',

            'method'
          ]
          // order: 'alphabetically'
        }
      }
    ],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-param-reassign': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/semi': ['off', null],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'always',
        types: 'prefer-import',
        lib: 'always'
      }
    ],
    '@typescript-eslint/type-annotation-spacing': 'off',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: true,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true
      }
    ],
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true
      }
    ],
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': 'off',
    'arrow-parens': ['off', 'always'],
    'brace-style': ['off', 'off'],
    'comma-dangle': 'off',
    complexity: 'error',
    'constructor-super': 'error',
    curly: false,
    'default-case': 'error',
    'eol-last': 'off',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      'undefined'
    ],
    'id-match': 'error',
    'import/no-default-export': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-internal-modules': 'error',
    'import/no-unassigned-import': [
      'error',
      {
        allow: ['reflect-metadata']
      }
    ],
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@redteclab/**',
            group: 'external',
            position: 'after'
          },
          {
            pattern: '@bully/**',
            group: 'external',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin']
      }
    ],
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/no-types': 'error',
    'linebreak-style': 'off',
    'max-classes-per-file': ['error', 1],
    'max-len': 'off',
    'max-lines': ['error', 700],
    'max-lines-per-function': ['error', 90],
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-extra-semi': 'off',
    'no-fallthrough': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'error',
    'no-irregular-whitespace': 'off',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1],
        ignoreEnums: true,
        ignoreArrayIndexes: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreDefaultValues: true
      }
    ],
    'no-multi-str': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-wrappers': 'error',
    'no-null/no-null': 'off',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-restricted-imports': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      {
        selector: 'Identifier[name="parseInt"]',
        message: 'no parseInt > tsstyle#type-coercion'
      },
      {
        selector: 'Identifier[name="parseFloat"]',
        message: 'no parseFloat > tsstyle#type-coercion'
      }
    ],
    'no-return-await': 'error',
    'no-sequences': 'error',
    '@typescript-eslint/no-shadow': ['error'],
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'off',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      }
    ],
    'prefer-arrow/prefer-arrow-functions': 'error',
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    'quote-props': 'off',
    radix: 'error',
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          ClassDeclaration: true,
          FunctionDeclaration: true,
          MethodDefinition: true
        },
        checkConstructors: false,
        contexts: ['TSInterfaceDeclaration', 'TSDeclareFunction']
      }
    ],
    'space-before-function-paren': 'off',
    'space-in-parens': ['off', 'never'],
    'sort-keys': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'off',
    yoda: 'error'
  }
}
