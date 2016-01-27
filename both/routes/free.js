const freeRoutes = FlowRouter.group({
  name: 'free'
});

freeRoutes.route( '/viewPoll/:pollId', {
  name: 'viewPoll',
  action() {
    BlazeLayout.render( 'default', { yield: 'viewPoll' } );
  }
});

freeRoutes.route( '/viewPolls', {
  name: 'viewPolls',
  action() {
    BlazeLayout.render( 'default', { yield: 'viewPolls' } );
  }
});

freeRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});
