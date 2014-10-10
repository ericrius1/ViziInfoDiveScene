VisibilityEffector = function(targetObj) {
  Vizi.Script.call(this);
  this.targetObj = targetObj;
  this.thresholdReached = false;
}


goog.inherits(VisibilityEffector, Vizi.Script);



VisibilityEffector.prototype.update = function() {
  if(!this.thresholdReached && this._object.transform.position.distanceTo(this.targetObj.transform.position) < 100){
    this._object.dispatchEvent('distancethreshold')
    this.thresholdReached = true;

    // this._object.
  }
}