Template.welcome.helpers({
  locations: function(){

    return Locations.find({submitted: 0});
  }
});
