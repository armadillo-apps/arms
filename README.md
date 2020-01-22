# Arms

![CircleCI](https://img.shields.io/circleci/build/github/armadillo-apps/arms2.svg)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/armadillo-apps/arms.svg)

Apartments and Residential Managements System

## Files you need to create

Create a `cypress.env.json` and add the `baseUrl` , `backendUrl` and `adminPassword` to test cypress locally.

```json
{
  "baseUrl": "http://localhost:3000",
  "backendUrl": "http://localhost:3005",
  "testAdminPassword": "<password of admin you created locally>"
}
```

Create a `.env` and add the `REACT_APP_URL`.

```
REACT_APP_URL = "http://localhost:3005"
```

## Getting started

To start development

```
npm start
```

To run the tests

```
npm test
```

To build the app

```
npm run build
```
