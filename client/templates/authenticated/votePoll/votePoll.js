Template.votePoll.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var pollId = FlowRouter.getParam('pollId');

        PollSubs.subscribe('singlePollStances', pollId);
        PollSubs.subscribe('singlePoll', pollId);
    });
});


Template.votePoll.helpers({
  votePollOptions: function () {
    var stances = Stances.find().fetch();
    return _.map(stances, function (s) {
      return {label: s.stance, value: s._id};
    });
  }
});


AutoForm.addHooks('votePoll', {
  before: {
    method: function(doc) {
      doc.pollId = FlowRouter.getParam('pollId');
      return doc;
    }
  },
  onSuccess: function (formType, result) {
    console.log(result);
    FlowRouter.go("/viewPoll/" + result);
  }
});
