Template.insertStance.onCreated(function() {
    var self = this;
    self.ready = new ReactiveVar();
    self.autorun(function() {
        var pollId = FlowRouter.getParam('pollId');
        // potentially just get answers
        var handle = PollSubs.subscribe('singlePoll', pollId);
        self.ready.set(handle.ready());
    });
});

Template.insertStance.events({
  "click #votePoll": function (event) {
    FlowRouter.go("/votePoll/" + FlowRouter.getParam('pollId'));
  }
});

AutoForm.addHooks('insertStance', {
  before: {
    method: function(doc) {
      doc.pollId = FlowRouter.getParam('pollId');
      return doc;
    }
  }
});
