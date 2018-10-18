# Solais Web for LIFX

Solais is a single page application to create a colorful light scene based on your favourite pictures

## Screenshots

![ScreenShot](./screenshots/solais-screenshot.png?raw=true "Solais View")

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

-   Have `yarn` and the latest version of `node` installed. (Instructions below)

### Keys

-   [LIFX](https://api.developer.lifx.com/) Sign up for a key here. Make sure to save the key and keep in a safe place.

### Dependencies

Installing dependencies MacOS:

-   Note: requires brew to be installed

-   `brew install yarn`

-   `brew install node`

Installing dependencies Windows:

-   [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-tab) - Get the Yarn install from the project page.

-   [Node](https://nodejs.org/en/) - Get the latest version of node js 8+ from the project page

Installing dependencies Linux:

-   Use your package manager of choice to get `Yarn` and `Node` packages

### Installing

Navigate to your workspace using a terminal and clone the repo into it

```
git clone https://github.com/cernst11/solais-web
```

Go into project directory

```
cd solais-web
```

## Deployment

To start a development server on localhost:3000

```
yarn start
```

Yarn will automatically open your default browser. The browser will prompt for your api key.

## Built With

-   [yarn](https://yarnpkg.com/en/) - Dependency Management
-   [webpack](https://webpack.github.io/) - Module Bundler
-   [CRA](https://github.com/facebook/create-react-app) - Create React App

## Authors

-   **Christian Ernst** - _Initial work_ - [cernst11](https://github.com/cernst11)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
