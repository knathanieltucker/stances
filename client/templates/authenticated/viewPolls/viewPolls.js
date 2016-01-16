Template.viewPolls.onCreated(function() {

  PollSubs.subscribe('Polls');

});

Template.viewPolls.helpers({
  polls: function () {
    return Polls.find();
  }
});
