Template.viewPoll.onCreated(function() {

  Template.instance().subscribe( 'singlePoll',
    FlowRouter.getParam('pollId') );

});

Template.viewPoll.onRendered(function () {

});

Template.viewPoll.onDestroyed(function () {
});

Template.viewPoll.helpers({
  poll: function () {
    return Polls.findOne();
  }
});
