const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/insertPoll', {
  name: 'insertPoll',
  action() {
    BlazeLayout.render( 'default', { yield: 'insertPoll' } );
  }
});

authenticatedRoutes.route( '/insertStance/:pollId', {
  name: 'insertStance',
  action() {
    BlazeLayout.render( 'default', { yield: 'insertStance' } );
  }
});


authenticatedRoutes.route( '/votePoll/:pollId', {
  name: 'votePoll',
  action() {
    BlazeLayout.render( 'default', { yield: 'votePoll' } );
  }
});

