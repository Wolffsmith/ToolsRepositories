# Tool Repositories Backend

Tool Repositories Backend is a NodeJS API to help you to organize your Tools.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install the dependencies (or one of your choice).

```bash
yarn install
```

#### After the installation of the dependencies.

Go to the file: ormconfig.json

```bash
Change the config to one of your preference.
```

The default in this example uses a postgres database with docker.

To learn more about [docker](https://docs.docker.com/engine/reference/commandline/app_init/)

#### After the configuration of the database.

Open the console in the project's backend folder, you will need to run the migration.

```bash
yarn typeorm migration:run
```

To more information about migration with [typeorm](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)

#### After running the migration to run the application type:

```bash
yarn dev:server
```

## Usage

Run the app and use Insominia or other similar software to consume the API.

### or

Run the Web [app](https://github.com/Wolffsmith/V4/tree/master/web).

## License

[MIT](https://choosealicense.com/licenses/mit/)
