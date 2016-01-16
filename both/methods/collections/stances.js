Meteor.methods({
  insertStance: function (stance) {
    check(stance, Object);

    // we mimic our stances schema checks here
    if (!this.userId)
      throw new Meteor.Error("insertStanceFormValidation", "You must be logged in to create a stance");

    if (!Match.test(stance.stance, String) || !stance.stance || stance.stance.length > 200)
      throw new Meteor.Error("insertStanceFormValidation", "You must provide a valid stance");

    if (!Polls.findOne({_id: stance.pollId}))
      throw new Meteor.Error("insertStanceFormValidation", "You must provide a given poll a stance");

    // the rest will get filled by the schema
    Stances.insert({
      stance: stance.stance,
      pollId: stance.pollId
    });

  }
});
