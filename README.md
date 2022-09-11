# MordOS

This is a simple os app that runs in a browser. The purpose of this project is to showcase my React.js knowledge.

## Improvements

- store user credentials in a database
  - currently I'm storing the credentials in an .env file which is ok for development, but as soon as we want to use this app in real life scenario we need to create a database and a dedicated backend. The backend should handle all the login logic and should NEVER return a password but rather a token (that expires after some time), since we shouldn't store this kind of info on the frontend.
- get some UI/UX designer to fix this sh... whatever this UI currently is 😂
- create a news and gallery app
  - since I ran out of time I couldn't implement this two features, but in general I would use Axios to call those APIs. Since I'm a big fan of async/await I would use that. I would also look into Redux-Saga library since there can be some side effects with fetching data.
- use different branches
  - I was working alone on this project and didn't really have a need to use branches, but in future I would use one main branch, one development branch and then add additional feature and if needed some bugfix branches 😂
- write tests
  - I would use Jest for writing tests mainly for the redux store and some core utility functions
- use CI/CD
  - I would add some stages for linting before creating merge request and also run all the tests

## Things that didn't run so smooth in this project

- I've created the [designs in Figma](https://www.figma.com/file/gUvzxL3aXO21D4WD7uOs34/Untitled?node-id=0%3A1) first, but I didn't think about mobile devices so I had to do that while programming

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
