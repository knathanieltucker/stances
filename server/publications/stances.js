Meteor.publish( 'singlePollStances', function(pollId) {
  check(pollId, String);
  return Stances.find( { pollId: pollId } );
});
