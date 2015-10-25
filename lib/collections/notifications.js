// Notificaitons = new Mongo.Collection('notifications');

// Notifications.allow({
//   update: function(user_id, obj, fieldNames){
//     return ownsObject(user_id, obj) &&
//       fieldNames.length === 1 && fieldNames[0] === 'read';
//   }
// });

// createCommentNotification = function(checkin){
//   var location = Locations.findOne(checkin.location_id);
//   if (checkin.user_id !== location.user_id) {
//     Notifications.insert({
//       user_id: location.user_id,
//       location_id: location._id,
//       checkin_id: checkin._id,
//       checkin_name: checkin.author,
//       read:false
//     });
//   }
// };
