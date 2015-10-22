Template.usersList.helpers({
  users: function(){
    console.log("Count");
    console.log(Users.find().count);
    return Users.find();
  }
});
