# GRIP WEB UI

This repo hosts GRIP's web-ui code and deployment information.

## Building and running on localhost

`npm` version lower than 7 could have package build issues.

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Running

### Plain HTML

Open the file `dist/index.html` in your browser

### Docker

Run the following:

For production, port at localhost:1235
```shell
cd docker; docker-compose -f docker-compose.prod.yml up --build
```

For dev, port at localhost:1234
```shell
cd docker; docker-compose -f docker-compose.dev.yml up --build
```

Add `-d` parameter if you want docker-compose to run in background.


## Credits

- Used [createapp.dev](https://createapp.dev/) for setting up the initial environment.
