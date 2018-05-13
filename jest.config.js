module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/index.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__mock__/**',
    '!**/vendor/**'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: -10,
      statements: 90
    }
  },
  coverageReporters: [
    'json',
    'lcov',
    'text'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: [
    'ts',
    'js'
  ]
}
