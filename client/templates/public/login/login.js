Template.login.onRendered( () => {

});

Template.login.events({
  'submit form': ( event ) => event.preventDefault(),
  'click .btn-facebook': () => {
    Meteor.loginWithFacebook({requestPermissions: ['email']}, (error)=> {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( 'Welcome!', 'success' );
      }
    });
  },

  'click .btn-create-account':() => {
    signinOrSignup('signup', Template.instance(), "#sign-in-with-email");
  },

  'click .btn-sign-in': () => {
    signinOrSignup('signin', Template.instance(), "#sign-in-with-email");
  }

});

function signinOrSignup (signinOrSignupState, template, form) {
  $( form ).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.'
      }
    },
    submitHandler() {
      if (signinOrSignupState === "signin")
        return _handleSignin(template);
      if (signinOrSignupState === "signup")
        return _handleSignup(template);
    }
  });
}

let _handleSignin = ( template ) => {
  let email    = template.find( '[name="emailAddress"]' ).value,
      password = template.find( '[name="password"]' ).value;

  Meteor.loginWithPassword( email, password, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'warning' );
    } else {
      Bert.alert( 'Logged in!', 'success' );
    }
  });
};

let _handleSignup = ( template ) => {
  let user = {
    email: template.find( '[name="emailAddress"]' ).value,
    password: template.find( '[name="password"]' ).value
  };

  Accounts.createUser( user, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( 'Welcome!', 'success' );
    }
  });
};
