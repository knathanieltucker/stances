Accounts.onCreateUser(function (options, user) {
  user.votes = {polls: []};

  // We still want the default hook's 'profile' behavior.
  if (options && options.profile)
    user.profile = options.profile;

  return user;
});
