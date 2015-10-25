Template.welcome.helpers({
  locations: function(){
    return Locations.find();
  }
});
Template.welcomeLocations.helpers({
  locations: function(){
    return Locations.find();
  }
});
