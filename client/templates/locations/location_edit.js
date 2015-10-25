Template.locationEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentLocationId = this._id;

    var locationProperties = {
      name: $(e.target).find('[name=name]').val()
    }

    Locations.update(currentLocationId, {$set:locationProperties}, function(error){
      if(error){
        throwError(error.reason);
      } else {
        Router.go('locationPage',{_id:currentLocationId});
      }
    });
  },

  'click .delete': function(e){
    e.preventDefault();
    if(confirm("Delete this post?")){
      var currentLocationId = this._id;
      Locations.remove(currentLocationId);
      Router.go('locationsList');
    }
  }
});
