# Prototype Playground of Firebase Product

## Requirements

- node 12.11.0
- node 8.16.1
- JDK

## Setup

```
$ node -v
v12.11.0
$ cp src/config/example.ts src/config/config.ts
# Rewrite config to your firebase settings
$ nvim src/config/config.ts
$ yarn install
$ yarn build

# functions
$ cd functions
$ yarn install
$ node -v
v8.16.1
$ cp functions/src/config/example.ts functions/src/config/config.ts
$ nvim functions/src/config/config.ts
$ yarn install
$ yarn build

# run firebase emulator on root directory using v8.16.1
$ cd -
$ node -v
v12.11.0
$ nodenv shell 8.16.1
$ node -v
v8.16.1
$ npx firebase login
# use firebaserc to omit --project option
$ npx firebase serve --only hosting,functions --project [your projectId]
```

## Test

```
# functions
$ cd functions
$ node -v
v8.16.1
$ yarn test

# firestore.rules
$ node -v
v8.16.1
$ npx firebase setup:emulators:firestore
$ npx firebase serve --only firestore
$ npx firebase deploy --only firestore:rules --project [your projectId]

$ node -v
v12.11.0
# Maybe use ipv6 to connect firestore emulator if asyc function is timeout
# So change localhost to loop back address
$ export FIREBASE_FIRESTORE_EMULATOR_ADDRESS=127.0.0.1:8080
$ npx jest -c tests/jest.config.json tests
```