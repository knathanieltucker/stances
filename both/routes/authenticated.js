const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
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

authenticatedRoutes.route( '/viewPoll/:pollId', {
  name: 'viewPoll',
  action() {
    BlazeLayout.render( 'default', { yield: 'viewPoll' } );
  }
});

authenticatedRoutes.route( '/viewPolls', {
  name: 'viewPolls',
  action() {
    BlazeLayout.render( 'default', { yield: 'viewPolls' } );
  }
});

authenticatedRoutes.route( '/votePoll/:pollId', {
  name: 'votePoll',
  action() {
    BlazeLayout.render( 'default', { yield: 'votePoll' } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
  }
});
