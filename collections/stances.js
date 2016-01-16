Stances = new Meteor.Collection( 'stances' );

Stances.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Stances.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let StancesSchema = new SimpleSchema({
  "stance": {
    type: String,
    label: "A user stance to the poll.",
    max: 200
  },
  "pollId": {
    type: String,
    label: "The id of the associated poll"
  },
  "creator": {
    type: String,
    label: "The ID of the creator of this comment.",
    optional: true,
    denyUpdate: true,
    autoValue: function () {
      if (this.isInsert)
        return Meteor.userId();
    }
  },
  "votes.count": {
    type: Number,
    label: "The number of upvotes the poll has.",
    min: 0,
    optional: true,
    autoValue: function () {
      if (this.isInsert)
        return 0;
    }
  },
  "votes.users": {
    type: [String],
    label: "The list of user ids that upvoted the poll.",
    optional: true,
    autoValue: function () {
      if (this.isInsert)
        return [];
    }
  }
});

Stances.attachSchema( StancesSchema );
