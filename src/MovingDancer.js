var MovingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('moving-dancer');
  this.direction = true;
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

MovingDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  var location = this.$node.offset();
  var move = this.direction ? 200 : -200;
  this.direction = !this.direction;

  var styleSettings = {
    left: location.left + move
  };
  this.$node.css(styleSettings);  
};