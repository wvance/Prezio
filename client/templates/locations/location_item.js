Template.locationItem.helpers({
  locationCheckins: function(){
    return Checkins.find({location_id: this._id});
  },
  ownLocation: function(){
    return this.user_id === Meteor.userId();
  }
});

Template.locationItem.Checkins = function(){

}

Template.debugLocation.helpers({
  locationCheckins: function(){
    return Checkins.find({location_id: this._id});
  }
});

// Template.locationItem.rendered = function () {
//   renderTiles();
// }
Template.locationItem.onRendered(function() {
  var self = this;

  images = ["/images/howdy.jpg","/images/ring.jpg","/images/football.jpg", "/images/band.jpg"]
  var image = images[Math.floor(Math.random() * images.length)];

  self.autorun(function() {
    renderTiles(image);
  });
});

function getLocation(){
  var location = Locations.findOne({_id:Template.parentData(0)._id});

  console.log("Location ID: " + location._id);
  return location
}

function getExpectedCheckins(location){
  return location.expected_checkins;
}
function getCurrentCheckins(location){
  return Checkins.find({location_id: location._id}).fetch().length;
}

function renderTiles(image){
  var location = getLocation();
  console.log("Number of Expected: " + getExpectedCheckins(location));
  console.log("Number of Current Checkins: " + getCurrentCheckins(location));

  var canvas = document.getElementById("canvas");
  var ctx=canvas.getContext("2d");
  var cw=canvas.width;
  var ch=canvas.height;

  // ROWS * COL = NUMBER STUDENTS IN CLASS
  var totalNumberStudents = getExpectedCheckins(location);
  var currentNumberStudents = getCurrentCheckins(location);
  var missingNumberStudents = totalNumberStudents - currentNumberStudents;

  console.log("Missing: "+missingNumberStudents);

  // missingNumberStudents = 2;
  var grid = calculate_grid(totalNumberStudents);
  var rows= grid[0];
  var cols= grid[1];

  var img = new Image();
  img.onload=start;

  img.src= image;

  function start(){
    var iw=canvas.width=img.width;
    var ih=canvas.height=img.height;
    var pieceWidth=iw/cols;
    var pieceHeight=ih/rows;

    var pieces = createGridArray(rows, cols);

    // shuffle(pieces);

    // Draw each piece on canvas
    // HOW TO FILL IN RANDOM ORDER?
    // INITIALIZE ARRAY WITH ELEMNTS IN IT, SHFFLE ARRAY, USE VALUES IN THE ARRAY FOR THE LOOPS
    var randomOrder = [];
    for (index = 0; index < pieces.length; index++){
      randomOrder.push(index);
      // console.log("Number Inserted: " + index);
    }

    shuffle(randomOrder);

    // console.log("RANDOM ORDER SIZE" + randomOrder.length);
    for (index2 = 0; index2 < randomOrder.length; index2++){
      // console.log("Shuffled order " + randomOrder[index2]);
    }

    currentNumberStudents = (pieces.length - totalNumberStudents);
    for(var im = 0; im<randomOrder.length; im++){
      // window.alert(currentNumberStudents)
      if (im < currentNumberStudents){
        var im_row = Math.floor(randomOrder[im] / rows);
        var im_col = (randomOrder[im] % cols);
        // window.alert(im_row + " " + im_col);

        ctx.drawImage(
          img,
          im_col*pieceWidth, im_row*pieceHeight, pieceWidth, pieceHeight,
          im_col*pieceWidth, im_row*pieceHeight, pieceWidth, pieceHeight
        );
      }
    }

    // // GOING THROUGH EACH COL AND ROW AND PLACING IMAGES ONCE AT A TIME BOTTOM TO TOP
    // var i = 0;
    // for(var y=0;y<rows;y++){ // Iterate through each row
    //   for(var x=0;x<cols;x++){ // Iterate through each col
    //     if (i < missingNumberStudents){
    //       var p=pieces[i++];
    //     } else {
    //       var p=pieces[i++];
    //       ctx.drawImage(
    //         // from the original image
    //         img,
    //         // take the next x,y piece
    //         x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight,
    //         // draw it on canvas based on the shuffled pieces[] array
    //         p.col*pieceWidth, p.row*pieceHeight, pieceWidth, pieceHeight
    //       );
    //     }
    //   }
    // }
  }
};

function createGridArray(rows, cols){
  var pieces = [];
  // HAS TO BE IN THIS ORDER!: CANVAS DRAWS THIS WAY
  for(rowN = 0; rowN < rows; ++rowN){
    for(colN = 0; colN < cols; ++colN){
      pieces.push({col:colN,row:rowN});
    }
  }
  return pieces;
};

function calculate_grid(studetns){
  var maximum_students = 10000
  var numberSquares = 0
  // THE PURPOSE OF THIS IS TO MAKE A SQUARE, WE WANT ROWS AND COLS TO BE THE SAME NUMBER
  // FOR 100 STUDENTS THIS WILL RETURN 10, FOR 99 STUDENTS ALSO 10, BUT FOR 81 IT RETURNS 9
  for (; (numberSquares*numberSquares) < (maximum_students); ++numberSquares) {
    if ((numberSquares * numberSquares) >= studetns){
      break
    }
  }
  var rows = numberSquares;
  var cols = numberSquares;
  return [rows, cols];
};

function shuffle(pieces){
  for(var j, x, i = pieces.length; i; j = Math.floor(Math.random() * i), x = pieces[--i], pieces[i] = pieces[j], pieces[j] = x);
  return pieces;
};

