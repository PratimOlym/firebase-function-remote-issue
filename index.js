  /* eslint-disable */

  /* eslint indent: 0 */ // --> OFF
  /* eslint object-curly-spacing: 0 */ // --> OFF
  /* lint object-curly-spacing: 0 */ // --> OFF
  /* eslint prefer-const: 0 */ // --> OFFnpm

  const express = require("express");
  const morgan = require("morgan");
  const helmet = require("helmet");
  const multer = require("multer");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  require("dotenv").config();
  const cookieSession = require("cookie-session");
  const express_session = require("express-session");
  const cookieParser = require('cookie-parser');
  //const middlewares = require("./middlewares");
  
 // const passport = require("passport");
  //const passportSetup = require("./passport");

  const projectRoute = require("./routes/projects4-share");

  const functions = require("firebase-functions");
  const admin = require("firebase-admin");
  const app = express();
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express_session(
    { secret: 'SECRET' ,
    resave: false,
    saveUninitialized: true,  //WHat does this mean?
    cookie: { 
      //secure: true, // THis is to be marked true for https
      maxAge : 2*1000 }
  
  }));
  //app.use(passport.initialize());
  //app.use(passport.session());

 
  const router = express.Router();
  const path = require("path");

  
  app.use("/api/projects", projectRoute);

  
  exports.app = functions.https.onRequest(app);



    //TODO - i commented this to avoid error of EADDRRINUSE during startup.
    app.listen(8800, () => {
      console.log("Backend server is running!");
    });

   