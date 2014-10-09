TrackerScript = function(targetObj) {
  Vizi.Script.call(this);
  this.targetObj = targetObj;

}



goog.inherits(TrackerScript, Vizi.Script);

TrackerScript.prototype.update = function() {
  if(this._object.transform.position.distanceTo(this.targetObj.transform.position) < 10){
    console.log("YARR")
  }
}