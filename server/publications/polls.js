Meteor.publish( 'singlePoll', function(pollId) {
  check(pollId, String);
  return Polls.find( { '_id': pollId } );
});

Meteor.publish( 'Polls', function() {
  return Polls.find( {}, {limit: 5} );
});
