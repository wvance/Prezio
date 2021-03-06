Template.checkinSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var checkin = {
      location_id: $(e.target).find('[name=location]').val(),
      is_excused: $(e.target).find('[name=excused]').is(":checked")
      // DONT WANT TO CHECK FOR THIS ON CLIENT SIDE
      // user_id: Meteor.userId()
    };

    Meteor.call('checkinInsert', checkin, function(error, result){
      if (error)
        return throwError(error.reason);

      if (result.checkinExists)
        throwError('You have already checked in here');
      Router.go('checkinPage', {_id: result._id});
    });
  }
});

Template.checkinSubmit.helpers({
  // GET LIST OF POSSIBLE LOCATIONS
  locations: function(){
    return Locations.find();
  }
});
