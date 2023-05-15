module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/src/app/tests/**/*.+(ts|js)?(x)',
        '**/?(*.)+(spec|test|integration-spec).+(ts|js)?(x)',
    ],
};
