Template.insertStance.onCreated(function() {

  Template.instance().subscribe( 'singlePoll',
    FlowRouter.getParam('pollId') );

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
