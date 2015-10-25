Router.configure({
  layoutTemplate: 'layout',
  // THIS HANDLES THE 404 Error
  notFoundTemplate: 'notFound',
  // SHOWS LOADING TEMPLATE WHILE WE WAIT FOR DATA TO LOAD
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('locations'), Meteor.subscribe('checkins')];
  }
});

Router.route('/',{name:'welcome'});
Router.route('/locations', {name:'locationsList'});

Router.route('/checkins', {name:'checkinsList'});

// HERE IS A DYNAMIC ROUTE
// DYNAMICALLY ROUTE TO THE USER USINGID: DYNAMICALLY GIVE THE PAGE THE DATA FROM THE ID
// Router.route('users/:_id', {
//   name:'userPage',
//   data: function() {return Users.findOne(this.params._id);}
// });

// LOCATION ROUTES
Router.route('/locations/:_id', {
  name:'locationPage',
  data: function(){return Locations.findOne(this.params._id);}
});
Router.route('/locaitons/:_id/edit',{
  name:'locationEdit',
  data: function(){return Locations.findOne(this.params._id);}
});
Router.route('/newlocation', {name:'locationSubmit'});


// CHECKIN ROUTES
Router.route('/checkins/:_id',{
  name:'checkinPage',
  data: function(){return Checkins.findOne(this.params._id);}
});
Router.route('/newcheckin', {name:'checkinSubmit'});


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      throwError('Please Sign In');
    }
  } else {
    this.next();
  }
}

// TELLS IR TO SHOW NOT FOUND PAGE FOR WHEN DATA FUNCTION RETURNS FALSY OBJECT
Router.onBeforeAction('dataNotFound', {only:['userPage', 'locationPage', 'checkinPage']});
// ONLY LET LOGGED IN USERS GO TO checkinSubmit TEMPLATE
Router.onBeforeAction(requireLogin,{only:['checkinSubmit','locationSubmit']});
