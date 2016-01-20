Meteor.publish( 'comments', function(pollId) {
  check(pollId, String);
  return Comments.find({commentedOn: pollId}, {limit:5});
});
