AutoForm.addHooks('insertPoll', {
  onSuccess: function(formType, result) {
    // result is from the return of the method
    FlowRouter.redirect("/insertStance/" + result);
  },
});
