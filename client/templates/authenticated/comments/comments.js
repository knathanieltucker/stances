Template.comments.onCreated(function() {

  Template.instance().subscribe( 'comments',
    Template.instance().data._id );

});

Template.comments.helpers({
  comments: function () {
    return Comments.find({commentedOn: Template.instance().data._id});
  }
});
