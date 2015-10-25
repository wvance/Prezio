Template.locationItem.helpers({

  locationCheckins: function(){
    return Checkins.find({location_id: this._id});
  },
  ownLocation: function(){
    return this.user_id === Meteor.userId();
  }
});
