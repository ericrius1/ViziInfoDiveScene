G.TextPrimitive = function(params){

  var textPrimitive = new Vizi.Object();
  var textScript = new G.TextScript(params, textPrimitive);
  textPrimitive.addComponent(textScript);
  return textPrimitive;
}


G.TextScript = function(params, obj){
  Vizi.Script.call(this);
  this.textScale = 5;
  this.params = params;
  this.params.position = this.params.position || new THREE.Vector3()
  this.textSpawner = new TextCreator(this.textScale)
  this.padding = 1;

  var textMesh = this.textSpawner.createMesh(this.params.string, {});

  var mesh = new THREE.Mesh(new THREE.SphereGeometry(100))
  var visual = new Vizi.Visual({
    object: textMesh
  });
  obj.addComponent(visual)
  obj.transform.position.set(0, 10, 150)
  obj.transform.scale.set(10, 10, 10)

}

goog.inherits(G.TextScript, Vizi.Script);

G.TextScript.prototype.update = function(){
  
}
