Template.welcome.rendered = function () {
  // getParseLocations();
  // getParseCheckins();
  // setInterval(getParseLocations, 10000);
  // setInterval(getParseCheckins, 3000);
};

function getParseLocations(){
  var Place = Parse.Object.extend("CheckinPlaces");
  var query = new Parse.Query(Place);
  var locations = query.include("creator");

  var results = locations.find({
    success:function(results) {
      console.log("Total Locations: "+results.length);
      saveParseLocations(results);
    },
    error:function(error) {
      alert("Error when getting location objects!");
    }
  });
}

function getParseCheckins(){
  var Checkin = Parse.Object.extend("Checkin");
  var query = new Parse.Query(Checkin);
  var checkins = query.include("CheckIn,checkinPlace");

  var results = checkins.find({
    success:function(results) {
      console.log("Total Checkins: " + results.length);
      saveParseCheckins(results);
    },
    error:function(error){
      alert("Error while getting checkin objects!")
    }
  });
}

function saveParseLocations(locations){
  for (var i = 0; i < locations.length; i++) {
    var object = locations[i];
    var creator = object.get('creator');
    var location = {
      _id: object.id,
      name: object.get('name'),
      user_id: creator.id,
      bluetooth_id: object.get('bluetoothId'),
      external_id: object.id,
      expires: object.get('checkinExpiresUtc')
    };

    console.log(location);
    Meteor.call('parseLocationInsert', location, function(error, result){
      if (error)
        return throwError(error.reason);

      if (result.locationExists)
        console.log('Sorry, this is already a location');
      // Router.go('locationPage', {_id: result._id});
    });

  }
}

function saveParseCheckins(checkins){
  for(var i =0; i< checkins.length; i++){
    var object = checkins[i];
    var checkin_location = object.get('checkinPlace');
    var checkin_user = object.get("checkIn");

    var checkin = {
      _id: object.id,
      external_id: object.id,
      user_id: checkin_user.id,
      location_id: checkin_location.id,
    }
    console.log(checkin);
    Meteor.call('parseCheckinInsert', checkin, function(error, result){
      if (error)
        return throwError(error.reason);

      if(result.checkinExists)
        console.log('Sorry, already checked in');

    });
  }
};
