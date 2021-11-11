# TopDog

Welcome to TopDog! For the dog lovers out there...

The goal of this app is to create an interactive app using the [DogCeo API](https://dog.ceo/dog-api/documentation/). The app is expected
to be a React/Typescript app using modern tooling and dependencies. The app should have the following features:

1. The landing page should display a heading with the app's name (Top Dog).
2. The landing page should load the list of breed's from the DogCEO API and should display a grid of the breeds.
3. Each entry in the grid should list the name of the breed, the number of sub-breeds, and should show an image of the dog breed.

Of course, nothing's done until it is tested. In addition to implementing the core features:

1. Add tests that verify the API implementation is valid.
2. Add a test that verifies the application displays the list of dogs when loaded.
2. Bonus: update the app and test code so that the UI tests use mocked data.

# Getting Started

This project depends on `npm` and the React ecosystem. If you don't have `npm` installed, install it via `nvm`: https://github.com/nvm-sh/nvm#installing-and-updating

1. Clone this project.
2. `npm install`

## Testing your Changes

Your changes should pass visually, and should also pass the unit test suite.

To run the app and assess changes visually...

1. `npm run start`

To run the tests (which should exercise your changes)...

1. `npm run test`

## Guidelines

The goal of this project is not to assess familiarity with Typescript/javascript, but rather to assess familiarity with basic problems that will be solved in day-to-day development.

It is acceptable to use google and other tools to inform implementation. There is obviously a balance -- copy/pasting an answer out of StackOverflow is likely to be frowned upon, but using the internet to research the API's used in this project, typescript syntax, etc is a-ok.

### Can I add dependencies?

In general, yes. If a dependency makes the project too trivial and you have extra time, you may be asked to replace a dependency with a custom implementation.

## Documentation Links

1. DogCEO API Docs: https://dog.ceo/dog-api/documentation/
2. React Docs: https://reactjs.org/docs/getting-started.html
3. jest Docs: https://jestjs.io/docs/getting-started
4. react-testing Docs: https://testing-library.com/docs/react-testing-library/intro/

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
