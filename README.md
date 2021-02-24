# Arms

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
  "TEST_ADMIN_PASSWORD": "adminPw1"
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
