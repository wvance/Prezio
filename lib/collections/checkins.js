// Users = new Mongo.Collection('users');
Checkins = new Mongo.Collection('checkins');

// Checkins.allow({
//   insert: function(userId, doc) {
//     // only allow posting if you are logged in
//     return !! userId;
//   }
// });

Checkins.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Meteor.methods({
  // GET ATTRIBUTES FROM CLIENT SIDE
  checkinInsert: function(checkinAttributes){

    // CHECK IF USER IS LOGGED IN
    check(Meteor.userId(), String);

    // CHECK FOR LOCATION TO BE A STRING
    check(checkinAttributes,{
      location_id: String,
      is_excused: Boolean
    });

    // CHECKS DATABASE FOR MULTIPLE ENTRIES AND RETURNS TO THAT CHECKIN IF FOUND
    var duplicateCheckin = Checkins.findOne({
      location_id: checkinAttributes.location_id,
      user_id: Meteor.userId()
    });

    if (duplicateCheckin){
      return{
        checkinExists: true,
        _id: duplicateCheckin._id
      }
    }

    // ADD ANY SERVER SIDE ATTRIBUTES
    var user = Meteor.user();
    var checkin = _.extend(checkinAttributes, {
      user_id: user._id,
      author: user.username,
      submitted: new Date()
    });

    // INSERT THE CHECKIN INTO THE COLLECTION
    var checkinId = Checkins.insert(checkin);

    return {
      _id:checkinId
    };
  }
});
