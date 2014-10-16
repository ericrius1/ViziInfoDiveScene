G.TextPrimitive = function(params) {

  var textPrimitive = new Vizi.Object();

  var textScript = new G.TextScript(params, textPrimitive);
  textPrimitive.addComponent(textScript);
  var visibilityEffector = new G.VisibilityEffector({
    distance: 50
  })
  textPrimitive.addComponent(visibilityEffector);
  visibilityEffector.addEventListener('distancethreshold', function() {
    textScript.appear()
  })

  return textPrimitive;
}



G.TextScript = function(params) {
  Vizi.Script.call(this);
  this.params = params;

}

goog.inherits(G.TextScript, Vizi.Script);

G.TextScript.prototype.realize = function() {
  Vizi.Script.prototype.realize.call(this);
  this.textScale = 5;
  this.params.position = this.params.position || new THREE.Vector3()
  this.textSpawner = new TextCreator(this.textScale)
  this.padding = 1;

  var textMesh = this.textSpawner.createMesh(this.params.string, {});

  var mesh = new THREE.Mesh(new THREE.SphereGeometry(100))
  var visual = new Vizi.Visual({
    object: textMesh
  });
  this._object.addComponent(visual)
  this._object.transform.position.copy(this.params.position)
  this._object.transform.scale.set(10, 10, 10)
  this._object.transform.visible = false
  this._object.transform.lookAt(G.dolly.transform.position)

  var helper = new THREE.BoundingBoxHelper(textMesh, 0xff00ff)
  helper.update();
  var box = helper.box;

  var lineGeo = new THREE.Geometry();
  var width = (box.max.x - box.min.x) + this.padding
  var height = (box.max.y - box.min.y) + this.padding;

  lineGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  lineGeo.vertices.push(new THREE.Vector3(width, 0, 0));
  lineGeo.vertices.push(new THREE.Vector3(width, height, 0));
  lineGeo.vertices.push(new THREE.Vector3(0, height, 0));
  lineGeo.vertices.push(new THREE.Vector3(0, 0, 0));

  var lineMat = new THREE.LineBasicMaterial({
    depthwrite: true,
    depthtest: true,
    linewidth: 2
  });

  var line = new THREE.Line(lineGeo, lineMat);

  visual = new Vizi.Visual({
    object: line
  })
  line.translateX(-width/2)
  line.translateY(-height/2)
  this._object.addComponent(visual)
}

G.TextScript.prototype.update = function() {

}

G.TextScript.prototype.appear = function() {
  this._object.transform.visible = true;

}