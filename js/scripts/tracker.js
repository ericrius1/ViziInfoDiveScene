TrackerScript = function(targetObj) {
  Vizi.Script.call(this);
  this.targetObj = targetObj;
  this.thresholdReached = false;

}



goog.inherits(TrackerScript, Vizi.Script);

TrackerScript.prototype.update = function() {
  if(!this.thresholdReached && this._object.transform.position.distanceTo(this.targetObj.transform.position) < 10){
    this._object.dispatchEvent('distancethreshold')
    this.thresholdReached = true;

    // this._object.
  }
}