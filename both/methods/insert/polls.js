Meteor.methods({
  insertPoll: function ( poll ) {

    // we mimic our polls schema checks here
    check(poll, Object);
    if (!this.userId)
      throw new Meteor.Error("insertPollFormValidation", "You must be logged in to create a poll.");

    if (!Match.test(poll.title, String) || !poll.title || poll.title.length > 200)
      return new Meteor.Error("insertPollFormValidation", "You must provide a valid title.");

    if (!Match.test(poll.subtitle, String) || !poll.subtitle || poll.subtitle.length > 200)
      return new Meteor.Error("insertPollFormValidation", "You must provide a valid subtitle.");

    if (!Match.test(poll.stances, [Match.ObjectIncluding({stance: String})]))
      return new Meteor.Error("insertPollFormValidation", "Check the stances you provided. Some look incorrect.");

    // the rest will get filled by the schema
    Polls.insert({
      title: poll.title,
      subtitle: poll.subtitle,
      // only grabbing the stance here, the rest is unckecked
      stances: _.map(poll.stances, (stance) => {
        return { stance: stance.stance };
      } )
    });

  }



  // insertMethod( argument ) {
  //   check( argument, Object );

  //   try {
  //     var documentId = Collection.insert( argument );
  //     return documentId;
  //   } catch( exception ) {
  //     return exception;
  //   }
  // }
});
