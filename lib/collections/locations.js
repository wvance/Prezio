Locations = new Mongo.Collection('locations');

Checkins.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; }
});
