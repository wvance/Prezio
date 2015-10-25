Template.locationItem.helpers({

  locationCheckins: function(){
    return Checkins.find({location_id: this._id});
  },
  ownLocation: function(){
    return this.user_id === Meteor.userId();
  }
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

Template.locationItem.rendered = function () {
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

  missingNumberStudents = 2;
  var grid = calculate_grid(totalNumberStudents);
  var rows= grid[0];
  var cols= grid[1];

  var img = new Image();
  img.onload=start;
  img.src= "/images/howdy.jpg";

  function start(){
    var iw=canvas.width=img.width;
    var ih=canvas.height=img.height;
    var pieceWidth=iw/cols;
    var pieceHeight=ih/rows;

    var pieces = createGridArray(rows, cols);

    // shuffle(pieces);

    // Draw each piece on canvas
    var i = 0;
    for(var y=0;y<rows;y++){ // Iterate through each row
      for(var x=0;x<cols;x++){ // Iterate through each col
        if (i < missingNumberStudents){
          var p=pieces[i++];
        } else {
          var p=pieces[i++];
          ctx.drawImage(
            // from the original image
            img,
            // take the next x,y piece
            x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight,
            // draw it on canvas based on the shuffled pieces[] array
            p.col*pieceWidth, p.row*pieceHeight, pieceWidth, pieceHeight
          );
        }
      }
    }
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

