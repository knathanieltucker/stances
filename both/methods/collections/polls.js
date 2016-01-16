Meteor.methods({
  insertPoll: function ( poll ) {

    // we mimic our polls schema checks here
    check(poll, Object);
    if (!this.userId)
      throw new Meteor.Error("insertPollFormValidation", "You must be logged in to create a poll.");

    if (!Match.test(poll.title, String) || !poll.title || poll.title.length > 200)
      throw new Meteor.Error("insertPollFormValidation", "You must provide a valid title.");

    if (!Match.test(poll.subtitle, String) || !poll.subtitle || poll.subtitle.length > 200)
      throw new Meteor.Error("insertPollFormValidation", "You must provide a valid subtitle.");

    // the rest will get filled by the schema
    return Polls.insert({
      title: poll.title,
      subtitle: poll.subtitle
    });

  },

  votePoll: function (vote) {
    check(vote, Object);

    var user = Meteor.user();
    if (!user || !user.votes || !user.votes.polls)
      throw new Meteor.Error("votePollFormValidation", "You must be logged in to vote on a poll");

    if (user.votes.polls.indexOf(vote.pollId) !== -1)
      throw new Meteor.Error("votePollFormValidation", "You can only vote once");

    if (!Match.test(vote, Match.ObjectIncluding({stanceId: String, pollId: String })))
      throw new Meteor.Error("votePollFormValidation", "You must provide a valid stance");

    if (!Polls.findOne({ _id: vote.pollId}))
      throw new Meteor.Error("votePollFormValidation", "You must vote on a valid poll stance pair");

    var stance = Stances.findOne({ _id: vote.stanceId});
    if (!stance || !stance.votes || !stance.votes.users || stance.pollId !== vote.pollId)
      throw new Meteor.Error("votePollFormValidation", "You must vote on a valid poll stance pair");

    if (stance.votes.users.indexOf(user._id) !== -1)
      throw new Meteor.Error("votePollFormValidation", "You can only vote once");

    Stances.update({_id: vote.stanceId}, {
      "$push": {"votes.users": user._id},
      "$inc": {"votes.count": 1}
    });
    Meteor.users.update({_id: user._id}, {"$push": {"votes.polls": vote.pollId}});

    return vote.pollId;
  }

});
