# Introduction
A full-stack application Repository

## Running the Frontend Application
This repo contains a frontend application built using angular

To run this project follow the following steps:
- change the directory to `./clientApp/`
- run `npm install` and run `npm start`
- The project will run in development mode on the system on port `4200`.
- To run the project in prod mode run `npm run build`. Once the command is completed it generates build artifacts in the `./dist` folder which can be deployed on an http-server.

## Running the Server Application
This repo contains a Server-side application built using nodeJS and Express

To run this project follow the following steps:
- change the directory to `./serverApp/`
- create a `.env` file in the serverApp and add the desired port number you wish to run the server on with the key as `PORT=<Your Port Number>` and save it.
- Create a folder named `database` in the `serverApp` as this project uses json file in the folder `./database/` as the DB source.
- run `npm install` and run `npm start` which will run the application on prod mode. To run it in dev mode use command `npm start-dev`
- The project will run on the system on port `3000`

## Running both in PROD
- The `prebuild` and `postbuild` scripts of the serverApp has commands to build and copy the clientApp artifacts into teh `dist` folder of the serverApp. Which will be statically served by the serverApp.
- To run both the apps in PROD go to the `serverApp` directory and run `npm run build` which will run the prebuild and postbuild scripts and transpile the server code as well.
- To start the server run `npm run start`