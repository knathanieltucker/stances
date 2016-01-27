Template.viewPolls.onCreated(function() {

  PollSubs.subscribe('Polls');

});

Template.viewPolls.helpers({
  polls: function () {
    return Polls.find();
  },
  userVoted: function (pollId) {
    return Meteor.user() && Meteor.user().votes.polls.indexOf(pollId) !== -1;
  }
});
