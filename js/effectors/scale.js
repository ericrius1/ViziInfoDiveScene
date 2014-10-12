//The object this component is attached to will scale base on its distance to the camera
G.ScaleEffector = function(params) {
  Vizi.Script.call(this);
  this.params = params;
  this.firstTime =
  this.params.targetObject = this.params.targetObject || G.dolly
  this.params.farDistance = this.params.farDistance || 200 //If the target object is any farther to the object than this, scale is no longer affected.
  this.params.nearDistance = this.params.nearDistance || 50 // If the target object is any closer to to the object than this, scale is no longer affected
  this.params.farScale = this.params.farScale || 1 //The scale of the object when it is at the far distance from the target object
  this.params.nearScale = this.params.nearScale || 10 //The scale of the object when it's at the nearest distance to the target object
}


goog.inherits(G.ScaleEffector, Vizi.Script);



G.ScaleEffector.prototype.update = function() {

  var pos = new THREE.Vector3()
  pos.setFromMatrixPosition(this._object.transform.object.matrixWorld);
  var distance = pos.distanceTo(this.params.targetObject.transform.position);
  console.log(distance)

  if(distance < this.params.farDistance && distance > this.params.nearDistance){
    console.log('scale')
    var scale = G.map(distance, this.params.farDistance, this.params.nearDistance, this.params.farScale, this.params.nearScale)
    this._object.transform.scale.set(scale, scale, scale)

  }
  
}