import Express from 'express';
import session from 'express-session';
import passport from 'passport';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import sha512 from 'sha512';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const MongoStore = require('connect-mongo')(session);

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import User from './models/user';
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import users from './routes/user.routes';
import studyGroups from './routes/studyGroup.routes';
import message from './routes/message.routes';
import serverConfig from './config';
const LocalStrategy = require('passport-local').Strategy;

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: serverConfig.secret,
  resave: true,
  cookie: { httpOnly: false },
  saveUninitialized: true,
  name: 'teamstudy.sid',
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  function (email, password, done) {
    findUser(email, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect Login' });
      }
      if (sha512(password).toString('hex') !== user.password) {
        return done(null, false, { message: 'Incorrect Login' });
      }
      user.password = undefined;
      return done(null, user);
    });
  }
));

function findUser(email, callback) {
  User.findOne({ email }).exec((err, user) => {
    return callback(err, user);
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.cuid);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ 'cuid': id }, function (err, user) {
    if (user != null) {
      user.password = undefined;
    }
    done(err, user);
  });
});

app.use('/api/users', users);
app.use('/api/studyGroups', studyGroups);
app.use('/api/message', message);
app.use('/static', Express.static('public'));

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/static/style/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="/static/material-ui/css/bootstrap.min.css">
        <link rel="stylesheet" href="/static/material-ui/css/material-kit.css"/>
        <link rel="stylesheet" href="/static/style/curtain.css"/>
        <link rel="stylesheet" href="/static/style/animate.css"/>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="/static/images/fav.png" type="image/png" />
      </head>
      <body>
        <div id="curtain">
          <i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw" id="loading-icon" style="visibility:hidden;"></i>
          <span class="sr-only loading-text">Generating Awesomeness</span>
        </div>
        <div id="root" class="hidden">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script type="text/javascript" src="/static/js/loader.js"></script>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="/static/material-ui/js/bootstrap.min.js"></script>
        <script src="/static/material-ui/js/material.min.js"></script>
        <script src="/static/material-ui/js/material-kit.js" type="text/javascript"></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// Start app
const server = app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`TeamStudy is up and running on port: ${serverConfig.port}! Happy Testing!`); // eslint-disable-line
  }
});

// Socket.io
var io = require('socket.io').listen(server);

// Import events and event handlers and attach them to the socket.io instance
const socketEvents = require('./socketEvents')(io);

// console.log(server);
// console.log(__dirname);

// HTML page for debugging
app.get('/testchat', function (req, res) {
  res.sendFile(__dirname + '/testChat.html');
});

/*
// alternate method to create socket.io instance attached to server
import SocketIO from 'socket.io';
const io = new SocketIO(server, {path: '/api/chat'});
*/

export default app;
