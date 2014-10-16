G.VisibilityEffector = function( params) {
  Vizi.Script.call(this);
  this.params = params

  this.params.targetObject = this.params.targetObject || G.dolly
  //the distance from the object to the target object at which the object will become visible
  this.params.distance = this.params.distance || 200
  this.thresholdReached = false;
}


goog.inherits(G.VisibilityEffector, Vizi.Script);



G.VisibilityEffector.prototype.update = function() {
  var pos = new THREE.Vector3()
  pos.setFromMatrixPosition(this._object.transform.object.matrixWorld)
  if(!this.thresholdReached && pos.distanceTo(this.params.targetObject.transform.position) < this.params.distance){
    this.dispatchEvent('distancethreshold')
    this.thresholdReached = true;
  }
}