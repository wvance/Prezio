// Users = new Mongo.Collection('users');
Checkins = new Mongo.Collection('checkins');

Checkins.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; }
});
