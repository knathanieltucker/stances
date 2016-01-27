const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ () => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      route = FlowRouter.current();
      if (route.route.name !== 'login') {
        Session.set('redirectAfterLogin', route.path);
      }
      FlowRouter.go('login');
    }
  }]
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

