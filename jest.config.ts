// jest.config.js
import nextJest from 'next/jest'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    collectCoverage: true,
    collectCoverageFrom: ['./components/**', './lib/**', './pages/**'],
    resetMocks: true,
    // Add more setup options before each test is run
    setupFiles: ['<rootDir>/__helpers__/get-server-side-props-context.helper.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    testEnvironment: 'jest-environment-jsdom',
    modulePathIgnorePatterns: ['cypress', '__fixtures__'],
    // coverageReporters: ['html', ["lcovonly", {"projectRoot": __dirname}], 'text-summary'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
