Template.checkinSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var checkin = {
      location_id: $(e.target).find('[name=location]').val(),
      user_id: Meteor.userId()
    };

    checkin._id = Checkins.insert(checkin)
    Router.go('checkinPage', checkin);
  }
});
