# Developer Notes

Bellow are some explanations on some of the decision implemented and extra features added.

## Table of Contents

- [DB Schema](#db-schema)
- [Custom React Hooks](#custom-react-hooks)
- [Tests](#tests)
- [Eslint](#eslint)

## DB Schema

Although I'm using `Active Record Validations` for the uniqueness of the Incentive `code` I believe this validation should be done on the DB level for the sake of data integrity.

## Custom React Hooks:

I've decided to move all API interactions to a custom hook on `/javascript/hooks/useIncentive` to easily manage and share the state between apps.\
Although its a bit of a overkill for the feature in question I wanted to showcase a tipical structure I would use when handling complex States on the application, usually complementing with `React Context` to avoid prop drilling.

### API:

```tsx
import useIncentive from '@hooks/useIncentive';

const {
  loading,
  error,
  // all incentives created by the user
  incentives,
  // current redeemed incentive
  redeemedIncentive,
  // methods:
  // list all incentives
  list,
  // create incentive
  create,
  // redeem incentive
  redeem
} = useIncentive();
```

## Tests

Run tests with the following command:

```
yarn test
```

I've setup `JEST` and `RTL` in order to showcase some unit tests on the FE apps.\
For the sake of the challenge I've added `jest-fetch-mock` to mock the API calls, a better solution would be to use `msw` but I don't think it would bring any value to this context.

Also I didn't add any tests for the custom hook (`useIncentive`) (seemed out of scope), to do so I would use `@testing-library/react-hooks` package.

## Eslint

I noticed that the `eslintrc.` file was using exporting a JS module and as a result it was not working, so I tried to adapt the eslint to the current code patterns, although I didn't add any black listed files, so there might be linting errors outside the `app` folder.