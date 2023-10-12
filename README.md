# API Test Project

This project utilizes several dependencies to test an API. We use `cucumber` for Behavior Driven Development, `chai` for assertions, and `supertest` for HTTP assertions.

## Getting Started

Before running the tests, you need to install all the dependencies. Run the following command to install the dependencies:

```bash
npm install
```

## Running Tests

We are using `ts-node` to run the TypeScript code. You can run the tests with the following command:

```bash
npx cucumber-js
```

Or you can directly run
```
npm run e2e:test
```
to include all of the test case tagged with @e2e

## Dependencies

This project uses several libraries for testing:

- `chai` for assertions
- `cucumber` for Behavior Driven Development
- `supertest` for HTTP assertions
- `ts-node` and `typescript` for TypeScript execution and type checking

Type definitions for these libraries are included in the devDependencies.
