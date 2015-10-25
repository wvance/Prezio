Template.locationSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var location = {
      name: $(e.target).find('[name=name]').val(),
      // DONT WANT TO CHECK FOR THIS ON CLIENT SIDE
      // user_id: Meteor.userId()
    };

    Meteor.call('locationInsert', location, function(error, result){
      if (error)
        return throwError(error.reason);

      if (result.locationExists)
        throwError('Sorry, this is already a location');
      Router.go('locationPage', {_id: result._id});
    });

    // checkin._id = Checkins.insert(checkin)
    // Router.go('checkinPage', checkin);
  }
});
