G.TextPrimitive = function(params){

  var textPrimitive = new Vizi.Object();
  var textScript = new G.TextScript(params);
  textPrimitive.addComponent(textScript);
  return textPrimitive
}


G.TextScript = function(params){
  Vizi.Script.call(this);
  this.textScale = 5;
  this.params = params;
  this.params.position = this.params.position || new THREE.Vector3()
  this.textSpawner = new TextCreator(this.textScale)
  this.padding = 1;


}
goog.inherits(G.TextScript, Vizi.Script);

G.TextScript.prototype.realize = function(){
  var textMesh = this.textSpawner.createMesh(this.params.string, {});

  var mesh = new THREE.Mesh(new THREE.SphereGeometry(100))
  var visual = new Vizi.Visual({
    object: mesh
  });
  this._object.addComponent(visual)
  this._object.transform.position.set(0, 10, 300)

}

G.TextScript.prototype.update = function(){
  
}
