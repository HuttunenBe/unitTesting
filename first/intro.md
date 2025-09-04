# Unit testing with Jest

docs: https://jestjs.io/

## 1. Create a project folder

## 2. Create package.json

```shell
npm init -y
```

## 3. Install jest as devDependencies

```shell
npm install jest --save-dev
```

## 4. Modify test-script in package.json

```json
"scripts": {
    "test": "jest"
  }
```

## 5. Create test folder named `__test__`

## 6. Write tests

filename includes .test or .spec

## 7. run tests

```shell
npm test
```

## 7B. To run only one test file
```shell
npm test --testFile fileToBeTested.test.js
```