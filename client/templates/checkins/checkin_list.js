var checkinData = [
  {
    user:'Wesley Vance',
    location: 'CHI',
    url: "http://www.google.com"
  },
  {
    user:'BOB',
    location: 'Wireless',
    url: "http://www.google.com"
  },{
    user:'Matt',
    location: 'Ethics',
    url: "http://www.google.com"
  }
];
Template.checkinsList.helpers({
  checkins: checkinData
});
