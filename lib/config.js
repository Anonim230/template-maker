const configsToFiles = {
    'web-project': {
        html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="src/styles/style.css">
        <title>Document</title>
    </head>
    <body>
        <h1>Hello World</h1>
        <script src="src/script.js"></script>
    </body>
    </html>`,
        js: '',
        css: `*{
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    }`
    },
    server: `const { createServer } = require("http")

const server = createServer((request, response) => {
if(request.method === 'GET'){
    response.end("HELLO")
}
else if(request.method === 'POST'){
    request.addListener('data',(chunk) => {
        console.log(chunk.toString());
    })
    request.on('end',() => response.end("OK"))
}
})
server.listen(80, () => console.log('Running on port 80'))`,
    "react-app": {
        package: `{
  "name": "REPLACE_TEXT",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
"@testing-library/jest-dom": "^5.16.3",
"@testing-library/react": "^12.1.4",
"@testing-library/user-event": "^13.5.0",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-scripts": "5.0.0",
"web-vitals": "^2.1.4"
  },
  "scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"
  },
  "eslintConfig": {
"extends": [
  "react-app",
  "react-app/jest"
]
  },
  "browserslist": {
"production": [
  ">0.2%",
  "not dead",
  "not op_mini all"
],
"development": [
  "last 1 chrome version",
  "last 1 firefox version",
  "last 1 safari version"
]
  }
}
`,
        gitignore: `
/node_modules
/.pnp
.pnp.js
/coverage
/build
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*`,
        src: {
            App: `function App() {
  return (
    <div>App</div>
  );
}
export default App;`,
            index: `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`
        },
        public: {
            index: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created Anvarjons' script"
      />
      <title>React App</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>
  </html>
  `,
            manifest: `{
  "short_name": "React App",
  "name": "Created React App Sample",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
  }
  `,
            robots: `# https://www.robotstxt.org/robotstxt.html
  User-agent: *
  Disallow:
  `
        }
    },
    graphql: {
        server: `const { ApolloServer } = require('apollo-server')
const modules = require('./modules')
const server = new ApolloServer({
    modules,
    context: ({ req }) => {
    return {
      access_token: req.headers?.token
      }
    }
})

server.listen(4000, console.log('4000/graphql'))`,
        config: `const connectionString = 'postgres://postgres:user_name@host:port/db'
module.exports = {
    connectionString
}`,
        modules: {},
        model: {
            model: `CREATE TABLE REPLACE_TEXT(
    REPLACE_TEXT_id serial not null PRIMARY KEY,
    REPLACE_TEXT_name varchar(64) not null,
          )`
        },
        lib: {
            jwt: `const { verify, sign } = require('jsonwebtoken')

const verifyToken = payload => verify(payload, '1q2w3e4r')
const signToken = payload => sign(payload, '1q2w3e4r')

module.exports = {
    verifyToken,
    signToken
}`,
            postgres: `const { connectionString } = require('../config')
const { Pool } = require('pg')

const pool = new Pool({
    connectionString
})

const fetch = async(SQL, ...params) => {
    const client = await pool.connect()
    try {
        const { rows: [row] } = await client.query(SQL, params.length ? params : null)
        return row
    } finally {
        client.release()
    }
}

const fetchAll = async(SQL, ...params) => {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(SQL, params.length ? params : null)
        return rows
    } finally {
        client.release()
    }
}

module.exports = {
    fetch,
    fetchAll
}`
        },
        modules: {
            replace: {
                index: `const typeDefs = require('./schema')
const resolvers = require('./resolvers')

module.exports = {
    typeDefs,
    resolvers
}`,
            },
            index: `const REPLACE_TEXT = require('./REPLACE_TEXT')

module.exports = [
  REPLACE_TEXT
]`
        }
    }
}
module.exports = configsToFiles