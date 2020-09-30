
# Beamerstream

Beamerstream is a free and open-source text displaying app, especially made for houses of worship.

## Using the app

If you want to download and run Beamerstream, see our [Releases](https://github.com/Appinda/Beamerstream/releases) page.

## Technologies

This app is using these opensource libraries and frameworks:

- [BootstrapVue](https://bootstrap-vue.org)
- [Electron](https://www.electronjs.org)
- [Electron-builder](https://www.electron.build)
- [GraphQL](https://graphql.org)
- [NodeJS](https://nodejs.org/)
- [NuxtJS](https://nuxtjs.org)
- [Typescript](https://www.typescriptlang.org)
- [Vue](https://vuejs.org)

Thanks to all developers spending time contributing to those libraries and frameworks.

## Development setup

If you are a developer wanting to contribute, here are some instructions.

### Pre-requirements

Make sure to have [NodeJS](https://nodejs.org/en/) and [yarn](https://yarnpkg.com) installed on your machine.

### Common commands

Execute in `/src`:

- `yarn` to install all project dependencies.
- `yarn dev` to run the development app (web only).
- `yarn start`: to run production version (electron),
- `yarn generate`: to generate static nuxt output,
- `yarn run pack`: to pre-pack the application for build,
- `yarn dist` to build the full application.
- `yarn clean` to remove generate & build output folders.

#### Development

To develop, run these 2 commands:

- `yarn dev` to run the development app (web only).
- `yarn start -h -p 3001` to run the development backend server on port 3001.

## Contributing

To contribute to Beamerstream, feel free to submit issues on the [Issues](https://github.com/Appinda/Beamerstream/issues) page.