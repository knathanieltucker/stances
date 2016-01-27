Accounts.onLogin( () => {
  if (Meteor.isClient) {
    let redirect = Session.get('redirectAfterLogin');
    if (redirect && redirect !== '/login') {
      FlowRouter.go(redirect);
    } else {
      FlowRouter.go('index');
    }
  }

});
