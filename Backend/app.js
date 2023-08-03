const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const localStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const User = require("./model/Users");
const app = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "verygoodsecrea",
    resave: false,
    saveUninitialized: false,
    resave: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/newBlog", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
  });

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .then((userFromDB) => {
          if (userFromDB === null) {
            done(null, false, {
              message: "This email does not exits in the database ! ",
            });
          } else if (!bcrypt.compareSync(password, userFromDB.password)) {
            done(null, false, { message: "Wrong Password" });
          } else {
            done(null, userFromDB);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    req.login(user, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Your email cannot be empty" });
  }

  User.findOne({ email })
    .then((found) => {
      if (found) {
        return res.status(400).json({ message: "This email is already taken" });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        email,
        password: hash,
      }).then((dbUser) => {
        req.login(dbUser, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error while attempting to register ! " });
          }
          return res.status(200).json(dbUser);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("Server started at port 3000.");
});
