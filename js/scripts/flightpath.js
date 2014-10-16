FlightPathScript = function(flightPath) {
  Vizi.Script.call(this);
  this.flightPath = flightPath;
  this.speedFactor = 2400000

}



goog.inherits(FlightPathScript, Vizi.Script);

FlightPathScript.prototype.update = function() {
  // adjust the number after "performance.now() /" to slow down the animation speed.
  var time = (performance.now() / this.speedFactor) % 1;
  

  var pointA = this.flightPath.getPointAt(time);
  var pointB = this.flightPath.getPointAt(Math.min(time + 0.015, 1));

  pointA.z = -pointA.z;
  pointB.z = -pointB.z;
  this._object.transform.position.copy(pointA);
  this._object.transform.lookAt(pointB);
  this._object.transform.rotation.y = Math.PI; // look forward

}