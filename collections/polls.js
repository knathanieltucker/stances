Polls = new Meteor.Collection( 'polls' );

Polls.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Polls.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PollsSchema = new SimpleSchema({
  "creator.id": {
    type: String,
    label: "The ID of the creator of this poll.",
    optional: true,
    denyUpdate: true,
    autoValue: function () {
      if (this.isInsert)
        return Meteor.userId();
    }
  },
  "title": {
    type: String,
    label: "The title/question of the poll.",
    max: 200
  },
  "subtitle": {
    type: String,
    label: "The subtitle of the poll."
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

Polls.attachSchema( PollsSchema );
