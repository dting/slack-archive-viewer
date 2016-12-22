# Slack Archive Viewer

Tool for privately viewing archived Slack messages

## Features

Parser for slack export `.zip` files that loads archived messages into db
Web Client for browsing/searching archived messages/channels
Authentication with [`Sign in with Slack`](https://api.slack.com/docs/sign-in-with-slack) using JSON Web Token (JWT)  

## Built using:

[React](https://facebook.github.io/react/)  
[Redux](https://github.com/reactjs/redux)  
[Redux API Middleware](https://github.com/agraboso/redux-api-middleware)  
[React Router](https://github.com/ReactTraining/react-router)  

[Moment](http://momentjs.com/)  

[Sass](http://sass-lang.com/)  
[WebPack](https://webpack.github.io/)  
[Babel](https://babeljs.io/)  

[Sequelize](http://docs.sequelizejs.com/en/latest/)  
[Postgresql](https://www.postgresql.org/)  
[Node.js](https://nodejs.org/en/)  
[Express](http://expressjs.com/)  
[Passport](http://passportjs.org/)   

## File Structure

```
SlackArchiveViewer
├── client
│   │   // React Client App
│   ├── components
│   │   └── // Reusable components and static views
│   ├── config
│   │   └── // Client configuration files
│   ├── containers
│   │   └── // Components that make up application views
│   ├── modules
│   │   └── // Redux actions, constants, and reducers
│   └── styles
│       └── // Sass mixins, variables, and imports
│
├── config
│   └── // Shared config files
│
├── export-parser
│   └── // Slack export.zip file handler files
│
├── node_modules
│   └── // Dependencies
│
├── public
│   └── // Optimized html, js, and css files from `npm run build`
│
├── server
│   │   // API server
│   ├── api
│   │   └── // API endpoints
│   ├── auth
│   │   └── // User authentication 
│   ├── config
│   │   └── // Server configuration files
│   └── db
│       └── // Sequelize models and relationships for parser and api
│
└── // Application dot files, READMEs, and configs
```

- scss files are located in directories of the components they are styling.
- `client/modules` folder is a spin on [redux ducks](https://github.com/erikras/ducks-modular-redux).
  * Actions are created following [FSA](https://github.com/acdlite/flux-standard-action) standard.
  * API calls are made using Redux API Middleware [RSAA](https://www.npmjs.com/package/redux-api-middleware#redux-standard-api-calling-actions).

  
## Parser

The parser can be run using the `parse` npm script. Arguments are passed to parse using `--`, for example:

```
npm run parse -- -f -file=export.zip -team=myteam
```

* `--file` is required path to export zip file  
* `--team` is only required on the initial run when the team entity is created. Subsequent runs can omit that option  
* `-f` will force sync when connecting to db (All declared tables defined by models will be dropped before recreating the tables)  

### Help message

```
Usage:
  node read-archive.js [-options] [--team=teamName] --file=path/to/zip

  (--team required if adding archive export for a new team)
  options:
    -h    print this help message
    -f    force sync db (drops tables before creating)
```

## Development

### Requirements

Postgresql 9.5
- https://wiki.postgresql.org/wiki/Detailed_installation_guides

Node 6
- https://nodejs.org/en/

### Config

dotenv is used to load environmental variables. The `.env-sample` should be copied to `.env` and values updated.

Environmental variables used:

* IP               - default: 0.0.0.0
* PORT             - default: 9000
* APP_SECRET       - Sign jwt
* DOMAIN           - Used for oauth callback url
* SLACK_ID
* SLACK_SECRET

### DB

For development purposes, default pg role, password, and db are all `slarchive`. An environmental 
variable `DATABASE_URL` can be used to specify another db.

Postgres sync is called when running the server. Missing tables will be created. DB must be created before starting server.

```
// in psql
CREATE USER slarchive WITH PASSWORD 'slarchive';
CREATE DATABASE slarchive OWNER slarchive;
```
