module.exports = {
  "globals": {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  "testEnvironment": "node",
    "collectCoverage": true,
    "collectCoverageFrom": [
      "**/*.ts",
      "!**/bin.ts",
      "!**/index.ts",
      "!**/*.d.ts",
      "!**/node_modules/**",
      "!**/vendor/**"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    },
    "coverageReporters": [
      "json",
      "lcov",
      "text"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__test__/.*|(\\.|/)(test|spec))\\.ts$",
    "moduleFileExtensions": [
      "ts",
      "js"
    ]
}
