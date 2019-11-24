This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started Locally

To run locally, make sure you have npm or yarn installed. Then cd to the folder and:

```
> yarn install && yarn start
# or
> npm install && npm run start
```

You should see the app running at localhost:3000

If you see errors like below in the terminal:

```
Compiled with warnings.

./src/components/common/NotificationsRow/NotificationsList/NotificationCard/NotificationCardActions.js
  Line 16:  'MENU_OPTIONS' is assigned a value but never used  no-unused-vars

./src/components/forms/LoginForm/index.js
  Line 26:  'email' is assigned a value but never used     no-unused-vars
  Line 26:  'password' is assigned a value but never used  no-unused-vars

./src/components/common/MachineList/SensorsChart.js
  Line 58:  'interval' is assigned a value but never used  no-unused-vars

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
```

Its okay. They're just linting warnings. Your code did compile.

You can go to https://<VM_URL>:3000

## Arrow Frontend 101

Arrow's frontend is a create-react-app. To work on the application, you'll want to at least be familiar with the following:

- styled-components
- create-react-app
- graphql/apollo-client
- react.js
- antd react components
- antd Row and Col components, which are similar to bootstrap but use 24 columns instead of bootstrap's 12.
- strategies for overwriting antd styles (see below)

## Console Errors

- As of 8/4/2019 we have some console errors about react life cycle methods within two packages: (1) antd and (2) react-document title. Unfortunately, we just have to wait for some updates from these third party packages: https://github.com/gaearon/react-document-title/issues/62 and wait for v4 of antd. This shouldn't be an issue with the functionality, just an annoyance in the console.logs in development mode.

## Overwriting antd styles

You can overwrite antd styles at least two ways (probably more) but we use two strategies.

1 is to overwrite them globally. We do this a lot in `src/lib/theme/antdStyles.js`. Because of how antd compiles with create-react-app, you typically need to use !important with you custom styles to overwrite antd styles. Here's an example of us overwriting an antd input's placeholder text size:

```
  .ant-select-selection__placeholder {
    font-size: 16px !important;
  }
```

2 The second way to overwrite styles by wrapping an antd component in a styled component, and then applying your custom styles there. This has a similar outcome to the above, but it will only be applied locally (to components inside your styled wrapper). Here's an example where we have a Wrapper component that holds some custom styles to overwrite some style in antd's Select:

```
const Wrapper = styled.div`
  .ant-select-selection__rendered {
    display: flex;
    align-items: center;
  }
`;

const CountiesInput = props => {
  const { onChange, value = '' } = props;

  return (
    <Wrapper>
      <Select>
        {constants.counties.map(county => (
          <Option key={county} value={county}>
            {county}
          </Option>
        ))}
      </Select>
    </Wrapper>
  );
};
```

Note that depending on the style you want to apply, you may need to still use !important. Again, this is a nice strategy because your styles will onlly be applied locallly to whatever you wrap with Wrapper.

## Decoupling from Antd Components

We've tried to create specific files, often in the `components/common` folder, for each antd component we're using. Then we'll import the component. For instance, you'll see `import Row from "components/common/row"` which is just antd Row under the hood.

In theory, if we ever want to further decouple from antd, we'll just need to edit files like `components/common/Row` one time, and not need to update every single file that uses Row.

## Finding a piece of code

The easiest way to find a piece of code is to start at the router. First, checkout the URL of the relevant page. Then match that route with the router folder (`src/routes/index.js`). From there you'll see which file in the `src/routes` folder to look at. From the route file, you'll be able to follw the breadcrumbs all the way down to the components.

## Authenticated User

The authenticated user object is dropped down from the route as `this.props.currentUser`. We don't use redux as of now, so you'll just want to drop down the currentUser as a prop from your page code. Each page you create will automatically get your currentUser prop (see notes below about creating a new route/page).

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Custom Route Components: How to add a new route/page

We use a slightly different route component than the vanilla one provided by react-router-dom. If you go to `src/routes/index.js` you'll see something like:

```
<ProtectedRoute
  path="/search"
  currentUser={currentUserCheck}
  component={MachineSearchRoute}
  layout={ProtectedLayout}
  {...this.props}
/>
```

ProtectedRoute is what we'll call a "router component". We have two of them: PublicRoute and ProtectedRoute. If you are creating a page where the user needs to be authenticated, use a ProtectedRoute. If it's a public page (e.g. a login page, etc) then build your route with the PublicRoute. This way, you don't need to worry about re-routing a user into the app or out of the app inside your new page's code. The router component will handle that.

These router components take all the same props as a normal react-router-dom Route and they take some additional fields noted below:

- **layout**: This is the layout you'd like to wrap you page in. We have some reusabled layouts. Most likely, you'll just want to use ProtectedLayout, which is the basic dashboard layout we have on all pages as of now (8/4/2019).
- **component**: This is your page code. In the above example MachineSearchRoute is a page for searching machines that is wrapped in a ProtectedLayout component. So, this is where your page is defined.
- **path**: same as react-router-dom Route's path

Every page you create using a router component will have all the common react-router-dom props (history, location, match, etc) and also will have a this.props.currentUser.

## Folder stucture

The general structure is:

- **routes**: These are the top level pages that you can navigate around throughout the app (e.g. home, machine detail page, etc)
- **components**: Each route is going to be made up of several components. Some of those components are "one-off" components only used by that given route, or page. One-off components are typically stored in the specific route folder. Re-usable components (components that can be used in multiple routes/places) are stored in the components folder. TLDR: If more than one page can use the component, store it in the components folder. If the page you're creating is the only place in the entire app that needs the component, store it in the given route's folder.
- **components/charts**: This folder was initially going to be a place to store re-usable charts. This sounded good in theory but in practice we didn't have a lot of re-usable charts between different pages. If you can create a chart in a re-usable way, this is where you'd want to store it.
- **components/common**: This is a catch all folder for re-usable compoents. If the component you're making is not Text, not a Form, not an Input, not a chart, and not a layout-- just toss it in the components/common folder. This is where you'll find buttons, popovers, row, col, etc
- **components/forms**: This is a place to store forms. Typically we try to make forms agnostic of their submit function (e.g. the form is presentational and not tied to a specific save mutation or create mutation). So you can store your re-usable form here, and then wrap that form to provide whatever functionality you want onSubmit (e.g. wrap it to submit to a save mutation or a create mutation).
- **components/inputs**: This is a place to define re-usable components. Usually these are components that'll be used in a bunch of different forms. For instance, the TextInput is used in many forms. The DateInput is used in forms and filtering areas, etc.
- **components/layout**:
- **lib**: lib is a sort of catch-all folder for constants, helper function, media (images), and so on. If it's not a route and it's not a component and it's not something related to apollo-client-- stick it somewhere in the lib folder
- **ApolloClient**: everything apollo/graphql. Define fragments, queries and mutations here. This is also where you'll find the apollo-client instance being defined (links, etc).

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
