# TopDog

Welcome to TopDog! For the dog lovers out there...

The goal of this project is to create an app using the [DogCeo API](https://dog.ceo/dog-api/documentation/). The app is expected
to use React/Typescript, modern tooling, and modern dependencies where applicable.

The following requirements need to be implemented:

1. The app should display a landing page when loaded.
2. The landing page should display a heading with the app's name (Top Dog).
3. The landing page should display a grid of all dog breed's discoverable through the DogCEO API.
4. Each entry in the grid should display the name of the dog breed, the number of sub-breeds, and an image of the dog breed.

Of course, nothing's done until it is tested. In addition to the feature requirements:

1. Complete the tests in `api.test.ts` to verify the API implementation is valid.
2. Complete the tests in `App.test.tsx` that verifies the application displays the list of dogs when loaded.
3. Bonus: update the tests in `App.test.tsx` so that they can use either mocked data or live data from the API.

At the end of the project, we expect the following outcomes at a minimum:

1. `npm start` runs successfully and launches the app.
2. The app implements the requirements defined above.
3. All tests run via `npm run test` pass.
4. All tests in `api.test.ts` are fully implemented.

## Evaluation Criteria

The goal of this project is not to assess familiarity with Typescript/javascript, but rather with basic problems that will be solved in day-to-day development.

Solutions will be evaluated primarily on correctness in terms of meeting the stated requirements, and secondarily on code-cleanliness and terseness of code.

Don't worry about pixel perfection (though attention to detail will be noticed). Over-investing time at this stage is not the best use of time. The project should take between 1 and 4 hours to complete.

## Getting Started

This project depends on `git`, `npm`, and the React ecosystem. If you don't have `git` installed, you can download a zip of this project or you can install git. If you don't have `npm` installed, install it via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

1. Clone this project.
2. `npm install`

## Testing your Changes

Your changes should pass visually, and should also pass the unit test suite.

To run the app and assess changes visually...

1. `npm run start`

To run the tests (which should exercise your changes)...

1. `npm run test`

## Guidelines

It is ok to use google and other tools to inform implementation. There is a balance -- copy/pasting an answer out of StackOverflow is likely to be frowned upon. Uing the internet to research the API's used in this project, typescript syntax, etc is a-ok.

### Adding/Using Third-Party Dependencies

Adding and using third-party dependencies in your solution is acceptable. Some are already provided. If a dependency makes the project too trivial and you have extra time, you may be asked to replace a dependency with a custom implementation.

## Documentation Links

- DogCEO API Docs: <https://dog.ceo/dog-api/documentation/>
- React Docs: <https://reactjs.org/docs/getting-started.html>
- jest Docs: <https://jestjs.io/docs/getting-started>
- react-testing Docs: <https://testing-library.com/docs/react-testing-library/intro/>
