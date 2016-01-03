Comments = new Meteor.Collection( 'comments' );

// we temp allow editing Comments
// Comments.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false
// });

// Comments.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true
// });

let CommentsSchema = new SimpleSchema({
  "creator.id": {
    type: String,
    label: "The ID of the creator of this comment.",
    optional: true,
    denyUpdate: true,
    autoValue: function () {
      if (this.isInsert)
        return Meteor.userId();
    }
  },
  "comment": {
    type: String,
    label: "The comment made by the user."
  },
  "upvotes.count": {
    type: Number,
    label: "The number of upvotes the poll has.",
    min: 0,
    optional: true,
    autoValue: function () {
      if (this.isInsert)
        return 0;
    }
  },
  "upvotes.users": {
    type: [String],
    label: "The list of user ids that upvoted the poll.",
    optional: true,
    autoValue: function () {
      if (this.isInsert)
        return [];
    }
  },
  "downvotes.count": {
    type: Number,
    label: "The number of downvotes the poll has.",
    min: 0,
    optional: true,
    autoValue: function () {
      if (this.isInsert)
        return 0;
    }
  },
  "downvotes.users": {
    type: [String],
    label: "The list of user ids that downvoted the poll.",
    optional: true,
    autoValue: function () {
      if (this.isInsert)
        return [];
    }
  }
});

Comments.attachSchema( CommentsSchema );
