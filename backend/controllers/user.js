const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sentOTP = require("../helpers/sendOTP");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

exports.user_register = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // If no document is found, user is null
    if (user) {
      const errors = "Email already exists!";
      console.log(errors);
      return res.status(400).json(errors);
    } else {
      console.log("----", req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          const userFields = {};
          userFields.firstName = req.body.firstName;
          userFields.lastName = req.body.lastName;
          userFields.email = req.body.email;
          userFields.password = hash;
          //for simplicity now, we verify email manualy
          userFields.emailVerified = true;
          //save User
          new User(userFields)
            .save()
            .then((user) => {
              user.password = "";
              res.json(user);
            })
            .catch(next);
        });
      });
    }
  });
};

exports.user_phone = (req, res, next) => {
  console.log("phone works---- ", req.body);
  //save the number as not verified then send the OTP code
  User.findOne({ "phoneDetails.number": req.body.number }, (err, user) => {
    // If no document is found, user is null
    if (user) {
      console.log("number found ", user);
      //check if this number is beyond another account
      if (user.email !== req.userFromToken.email)
        return res.status(400).json("Phone already exists!");
    }
    //send OTP
    sentOTP(req.body.number, (result) => {
      //if done
      if (result.request_id) {
        //then save the phone details with the request id
        User.findOneAndUpdate(
          { _id: req.userFromToken._id },
          {
            $set: {
              phoneDetails: {
                ...req.body,
                verificationRequestId: result.request_id,
              },
            },
          },
          //to return the new one
          { new: true }
        )
          .then((user) => {
            res.status(200).json(user);
          })
          .catch(next);
      } else return res.status(400).json(result);
    });
  });
};

exports.user_verify = (req, res, next) => {
  console.log("verify works----");
  //find the user first
  User.findOne({ _id: req.userFromToken._id }, (err, user) => {
    if (!user || err) return res.status(400).json("something went wrong!");
    //start verify
    nexmo.verify.check(
      {
        request_id: user.phoneDetails.verificationRequestId,
        code: req.body.otp,
      },
      (err, result) => {
        console.log(err ? err : result);
        //res.send("verify code!")
        res.json(err ? err : result);
      }
    );
  });
};

exports.user_login = (req, res, next) => {
  console.log("login works, ->", req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    // If no document is found, user is null
    if (user) {
      if (user.emailVerified != true) {
        return res.status(401).json("Email is not verified!");
      } else {
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign(
              {
                email: user.email,
                _id: user._id,
              },
              process.env.AUTH_SECRET,
              {
                expiresIn: "1h",
              }
            );
            userToken = "Bearer " + token;
            //no need to send hashed password to the frontend
            user.password = "";
            res.status(200).json({ user, userToken });
          } else res.status(401).json("Password incorrect!");
        });
      }
    } else res.status(401).json("Email not found!");
  });
};
