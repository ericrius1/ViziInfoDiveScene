G.TextPrimitive = function(params) {

  var textPrimitive = new Vizi.Object();

  var textScript = new G.TextScript(params, textPrimitive);
  textPrimitive.addComponent(textScript);
  var visibilityEffector = new G.VisibilityEffector({
    distance: 80
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
  this.padding = 2;
  this._stretchTime = 2000

  var textMesh = this.textSpawner.createMesh(this.params.string, {});
  textMesh.scale.multiplyScalar(4)
  var mesh = new THREE.Mesh(new THREE.SphereGeometry(100))
  this.textVisual = new Vizi.Visual({
    object: textMesh
  });
  this._object.transform.position.copy(this.params.position)
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

  this.lineVisual = new Vizi.Visual({
    object: line
  })
  line.translateX(-width / 2)
  line.translateY(-height / 2)
}

G.TextScript.prototype.update = function() {

}

G.TextScript.prototype.appear = function() {
  this._object.addComponent(this.textVisual)
  this._object.addComponent(this.lineVisual)
  //scale object really small so user doesnt see flicker before tween takes over
  this._object.transform.scale.x = 0.0001
  this._object.transform.scale.y = 0.0001
  var csd = {
    scaleX: 0.001,
    scaleY: 0.001
  }

  var fsd = {
    scaleX: 1,
    scaleY: 1
  }

  var stretchTween = new TWEEN.Tween(csd).
  to(fsd, this._stretchTime).
  onUpdate(function() {
    this._object.transform.scale.set(csd.scaleX, csd.scaleY, 1)
  }.bind(this)).start()

}