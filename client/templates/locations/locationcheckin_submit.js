Template.locationCheckinSubmit.events({
  'submit form': function(e, template){
    e.preventDefault();

    var checkin = {
      location_id: template.data._id,
      is_excused: false
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
