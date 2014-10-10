VisibilityEffector = function(targetObj, params) {
  Vizi.Script.call(this);
  this.targetObj = targetObj;
  this.params = params
  this.thresholdReached = false;
}


goog.inherits(VisibilityEffector, Vizi.Script);



VisibilityEffector.prototype.update = function() {
  var pos = new THREE.Vector3()
  pos.setFromMatrixPosition(this._object.transform.object.matrixWorld)
  if(!this.thresholdReached && pos.distanceTo(this.targetObj.transform.position) < this.params.distance){
    this._object.dispatchEvent('distancethreshold')
    this.thresholdReached = true;
  }
}