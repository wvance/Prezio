Meteor.publish('checkins', function(){
  // EXAMPLE OF FIND WITH FILTERS
  // NOTE: LOCATION IS DEFINED HERE WHILE NAME IS DEFINED IN THE SUBSCRIBE METHOD
  // return Checkin.find({user: user}, {fields:{
  //   secret_field: false
  // }});
  // This would return a user (where defined in the subscribe),
  // and will not return the secret_field column
  return Checkins.find();
});

Meteor.publish('locations', function(){
  return Locations.find();
});

// Meteor.publish('users', function(){
//   return Users.find();
// });
