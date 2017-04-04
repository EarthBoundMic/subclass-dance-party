
// // Creates and returns a new dancer object that can step
// var Dancer = function(top, left, timeBetweenSteps) {

//   var dancer = {};

//   // use jQuery to create an HTML <span> tag
//   dancer.$node = $('<span class="dancer"></span>');

//   dancer.step = function() {
//     // the basic dancer doesn't do anything interesting at all on each step,
//     // it just schedules the next step
//     setTimeout(dancer.step, timeBetweenSteps);
//   };
//   dancer.step();

//   dancer.setPosition = function(top, left) {
//     // Use css top and left properties to position our <span> tag
//     // where it belongs on the page. See http://api.jquery.com/css/
//     //
//     var styleSettings = {
//       top: top,
//       left: left
//     };
//     dancer.$node.css(styleSettings);
//   };

//   // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
//   // this one sets the position to some random default point within the body
//   dancer.setPosition(top, left);

//   return dancer;
// };

var Dancer = function(top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.setPosition(top, left);
};

Dancer.prototype.step = function() {
  this.timeoutID = setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);  
};

Dancer.prototype.lineUp = function(left) {
  var styleSettings = {
    top: $('body').height() / 3,
    left: left
  };
  this.$node.css(styleSettings);  
};

Dancer.prototype.interact = function(side) {
  var oldInfo = this.$node.offset();
  oldInfo.height =  this.$node.height();
  oldInfo.width =  this.$node.width();

  this.$node.fadeIn();
  clearTimeout(this.timeoutID);
  this.$node.removeClass();
  this.$node.addClass('dancer');
  this.$node.css({'background-color': 'blue'});

  var styleSettings;

  if (side === 'left') {
    styleSettings = {
      top: $('body').height() - 400,
      left: 300,
    };
  } else {
    styleSettings = {
      top: $('body').height() - 400,
      left: 400,
    };
  }

  styleSettings.height = "+=300";
  styleSettings.width = "+=300";
  this.$node.animate(styleSettings);

  // return to what they were doing
  setTimeout(() => { 
    this.$node.css(oldInfo); 
    setTimeout(() => { this.step(); }, 3000); 
  }, 5000);

};