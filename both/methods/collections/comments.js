Meteor.methods({
  insertComment: function (comment) {
    check(comment, Object);
    // we mimic our stances schema checks here
    if (!this.userId)
      throw new Meteor.Error("insertCommentFormValidation", "You must be logged in to create a comment");

    if (!Match.test(comment.comment, String) || !comment.comment || comment.comment.length > 200)
      throw new Meteor.Error("insertCommentFormValidation", "You must provide a valid comment");

    if (!Polls.findOne({_id: comment.commentedOn}))
      throw new Meteor.Error("insertCommentFormValidation", "You must provide a given poll a comment");

    // the rest will get filled by the schema
    Comments.insert({
      comment: comment.comment,
      commentedOn: comment.commentedOn
    });

  }
});
