Locations = new Mongo.Collection('locations');

// Locations.allow({
//   insert: function(userId, doc) {
//     // only allow posting if you are logged in
//     return !! userId;
//   }
// });
Locations.allow({
  update: function(userId, location){return ownsObject(userId, location);},
  remove: function(userId, location){return ownsObject(userId, location);},
});

Locations.deny({
  update: function(user_id, location, fieldNames){
    return(_.without(fieldNames, 'name').length > 0);
  }
});

Meteor.methods({
  // GET ATTRIBUTES FROM CLIENT SIDE
  parseLocationInsert: function(locationAttributes){

    // CHECK FOR LOCATION TO BE A STRING
    check(locationAttributes,{
      _id: String,
      expected_checkins: Number,
      name: String,
      user_id: String,
      bluetooth_id: String,
      external_id: String,
      expires: Number
    });

    var duplicateLocation = Locations.findOne({
      name: locationAttributes.name
    });

    if (duplicateLocation){
      return{
        locationExists: true,
        _id: duplicateLocation._id
      }
    }

    var location = _.extend(locationAttributes, {
      submitted: new Date()
    });

    // INSERT THE CHECKIN INTO THE COLLECTION
    var locationId = Locations.insert(location);

    return {
      _id:locationId
    };
  },

  locationInsert: function(locationAttributes){

    // CHECK IF USER IS LOGGED IN
    check(Meteor.userId(), String);

    // CHECK FOR LOCATION TO BE A STRING
    check(locationAttributes,{
      name: String,
      expected_checkins: String
    });

    // CHECKS DATABASE FOR MULTIPLE ENTRIES AND RETURNS TO THAT CHECKIN IF FOUND
    var duplicateLocation = Locations.findOne({
      name: locationAttributes.name
    });

    if (duplicateLocation){
      return{
        locationExists: true,
        _id: duplicateLocation._id
      }
    }

    // ADD ANY SERVER SIDE ATTRIBUTES
    var user = Meteor.user();
    var location = _.extend(locationAttributes, {
      user_id: user._id,
      bluetooth_id: "None",
      expires: "Never",
      created_on: "Web",
      author: user.username,
      submitted: new Date()
    });

    // INSERT THE CHECKIN INTO THE COLLECTION
    var locationId = Locations.insert(location);

    return {
      _id:locationId
    };
  }
});
