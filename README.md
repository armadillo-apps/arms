# Arms

![CircleCI](https://img.shields.io/circleci/build/github/armadillo-apps/arms2.svg)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/armadillo-apps/arms.svg)

Apartments and Residential Managements System

## Setup

### Install dependencies

```
npm install
```

### Setup environment variables

Create a `cypress.env.json` and add the following to test cypress locally.

```json
{
  "BASE_URL": "http://localhost:3000",
  "BACKEND_URL": "http://localhost:3005",
  "TEST_ADMIN_PASSWORD": "testPassword1"
}
```

Create a `.env` and add the `REACT_APP_URL`.

```
REACT_APP_URL = "http://localhost:3005"
```

## Getting started

### Start app

```
npm start
```

### Run the tests

```
npm test
```

### Build the app

```
npm run build
```
