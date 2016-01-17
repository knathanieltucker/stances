Template.votePoll.onCreated(function() {

  Template.instance().subscribe( 'singlePoll',
    FlowRouter.getParam('pollId') );
  Template.instance().subscribe( 'singlePollStances',
    FlowRouter.getParam('pollId') );

});


Template.votePoll.helpers({
  votePollOptions: function () {
    var stances = Stances.find({
      pollId: FlowRouter.getParam('pollId')
    }).fetch();
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
