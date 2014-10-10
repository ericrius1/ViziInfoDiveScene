VisibilityEffector = function(targetObj, params) {
  Vizi.Script.call(this);
  this.targetObj = targetObj;
  this.params = params
  this.thresholdReached = false;
}


goog.inherits(VisibilityEffector, Vizi.Script);



VisibilityEffector.prototype.update = function() {
  if(!this.thresholdReached && this._object.transform.position.distanceTo(this.targetObj.transform.position) < this.params.distance){
    this._object.dispatchEvent('distancethreshold')
    this.thresholdReached = true;

    // this._object.
  }
}