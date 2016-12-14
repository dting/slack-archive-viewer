const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

const setup = function setup(User, config) {
  passport.use(new SlackStrategy({
    clientID: config.slack.clientID,
    clientSecret: config.slack.clientSecret,
    scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'],
  },
  (accessToken, refreshToken, profile, done) => {
    User.find({ where: { 'slack.id': profile.id } })
      .then((user) => {
        if (user) return done(null, user);
        user = User.build({
          name: profile.displayName,
          slack: profile,
        });
        return user.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
};

module.exports = {
  setup,
};
