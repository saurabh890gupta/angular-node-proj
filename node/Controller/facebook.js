// var passport = require('passport'),FacebookStrategy = require('passport-facebook').Strategy;
// var FacebookSchema = require('../Database/schema/facebookSchema');

// passport.use(new FacebookStrategy({ 
//   clientID: "1843839522411086", 
//   clientSecret: "e1fcae065fc331bc9758ec1b40d3c064",
//   callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     FacebookSchema.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));


// module.exports = passport;

