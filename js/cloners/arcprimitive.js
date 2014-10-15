G.ArcPrimitive = function(params) {

  var obj = new Vizi.Object;

  var script = new G.ArcPrimitiveScript();
  obj.addComponent(script);
 

  return obj;
}

G.ArcPrimitiveScript = function(param) {
  Vizi.Script.call(this, param);

  this.visible = false;
  this.shown = false;
}

goog.inherits(G.ArcPrimitiveScript, Vizi.Script)

G.ArcPrimitiveScript.prototype.realize = function() {
  // Script subclasses need to implement update()

  this.strandMat = new THREE.ShaderMaterial({
    uniforms: {
      color: {
        type: 'c',
        value: new THREE.Color(_.sample(G.colorPalette))
      }
    },
    attributes: {
      opacity: {
        type: 'f',
        value: []
      },
    },
    vertexShader: G.shaders.vs.strand,
    fragmentShader: G.shaders.fs.strand,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });

  var SUBDIVISIONS = 100;

  var strandGeometry = new THREE.Geometry()
  var curve = new THREE.QuadraticBezierCurve3();

  curve.v0 = new THREE.Vector3(0, 0, 0);
  curve.v1 = new THREE.Vector3(G.rf(1, 10), G.rf(10, 20), 0);
  curve.v2 = new THREE.Vector3(G.rf(10, 30), 0, 0);

  var opacity = this.strandMat.attributes.opacity.value
  for (var j = 0; j < SUBDIVISIONS; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / SUBDIVISIONS))
    opacity[j] = 0.0;
  }
  strandGeometry.dynamic = false
  var strand = new THREE.Line(strandGeometry, this.strandMat)

  var visual = new Vizi.Visual({
    object: strand
  });
  this._object.addComponent(visual);

  strand.material.attributes.opacity.needsUpdate = true
}

G.ArcPrimitiveScript.prototype.update = function() {
  if (this.visible && !this.shown) {
    this.growStrand(0);
    this.shown = true;
  }
}

G.ArcPrimitiveScript.prototype.appear = function(vertexIndex) {
  this.visible = true;
}

G.ArcPrimitiveScript.prototype.growStrand = function(vertexIndex){
  var opacity = this.strandMat.attributes.opacity;
  opacity.value[vertexIndex++] = 1;
  opacity.needsUpdate = true
  if (vertexIndex === opacity.value.length) 
    return;

  setTimeout(function() {
    this.growStrand(vertexIndex);
  }.bind(this), 30)
}