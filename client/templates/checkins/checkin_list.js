Template.checkinsList.helpers({
  checkins: function(){
    return Checkins.find({}, {sort:{submitted:-1}});
  }
});
